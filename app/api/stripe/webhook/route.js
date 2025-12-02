import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { verifyWebhookSignature } from '@/lib/stripe'
import { db } from '@/lib/supabase'

export async function POST(request) {
  try {
    const body = await request.text()
    const signature = headers().get('stripe-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    const event = verifyWebhookSignature(body, signature)

    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        const userId = session.metadata.userId

        if (userId) {
          // Update user with Stripe customer ID and activate subscription
          await db.updateUser(userId, {
            stripe_customer_id: session.customer,
            subscription_status: 'active',
          })
        }
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object
        
        // Find user by customer ID
        const users = await db.supabaseAdmin
          .from('users')
          .select('*')
          .eq('stripe_customer_id', subscription.customer)
          .single()

        if (users.data) {
          await db.updateUser(users.data.id, {
            subscription_status: subscription.status,
          })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object
        
        // Find user by customer ID
        const users = await db.supabaseAdmin
          .from('users')
          .select('*')
          .eq('stripe_customer_id', subscription.customer)
          .single()

        if (users.data) {
          await db.updateUser(users.data.id, {
            subscription_status: 'cancelled',
          })
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object
        
        // Find user by customer ID
        const users = await db.supabaseAdmin
          .from('users')
          .select('*')
          .eq('stripe_customer_id', invoice.customer)
          .single()

        if (users.data) {
          await db.updateUser(users.data.id, {
            subscription_status: 'past_due',
          })
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
      { error: 'Webhook processing failed' },
      { status: 400 }
    )
  }
}

