import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    let event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json({ error: 'Webhook Error' }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const userId = session.metadata.userId

        // Get subscription to check trial end date
        let trialEndsAt = null
        if (session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription)
          if (subscription.trial_end) {
            trialEndsAt = new Date(subscription.trial_end * 1000).toISOString()
          }
        }

        // Update user subscription status
        await supabase
          .from('users')
          .update({
            subscription_status: session.subscription ? 'trialing' : 'active', // If subscription exists, it's in trial
            stripe_subscription_id: session.subscription,
            subscription_plan: session.metadata.plan || null,
            trial_ends_at: trialEndsAt,
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId)

        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object

        // Find user by subscription ID and update status
        const { data: user } = await supabase
          .from('users')
          .select('*')
          .eq('stripe_subscription_id', subscription.id)
          .single()

        if (user) {
          await supabase
            .from('users')
            .update({
              subscription_status: 'expired',
              updated_at: new Date().toISOString(),
            })
            .eq('id', user.id)
        }

        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object

        // Update subscription status based on Stripe status
        const { data: user } = await supabase
          .from('users')
          .select('*')
          .eq('stripe_subscription_id', subscription.id)
          .single()

        if (user) {
          // Determine status: trialing if in trial, active if active, expired otherwise
          let status = 'expired'
          if (subscription.status === 'trialing') {
            status = 'trialing'
          } else if (subscription.status === 'active') {
            status = 'active'
          }

          // Update trial_ends_at if subscription has trial_end
          let trialEndsAt = user.trial_ends_at
          if (subscription.trial_end) {
            trialEndsAt = new Date(subscription.trial_end * 1000).toISOString()
          } else if (status === 'active') {
            // Clear trial_ends_at when subscription becomes active (trial ended)
            trialEndsAt = null
          }

          await supabase
            .from('users')
            .update({
              subscription_status: status,
              trial_ends_at: trialEndsAt,
              updated_at: new Date().toISOString(),
            })
            .eq('id', user.id)
        }

        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}