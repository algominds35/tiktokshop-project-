import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        // Check if user exists
        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single()

        if (!existingUser) {
          // Create new user with trial
          const trialStart = new Date()
          const trialEnd = new Date(trialStart)
          trialEnd.setDate(trialEnd.getDate() + 14)

          await supabase.from('users').insert({
            email: user.email,
            name: user.name,
            avatar: user.image,
            trial_start_date: trialStart.toISOString(),
            trial_end_date: trialEnd.toISOString(),
            subscription_status: 'trial',
            created_at: new Date().toISOString(),
          })
        }

        return true
      } catch (error) {
        console.error('Sign in error:', error)
        return false
      }
    },
    async session({ session, token }) {
      if (session.user) {
        // Get user data from database
        const { data: user } = await supabase
          .from('users')
          .select('*')
          .eq('email', session.user.email)
          .single()

        if (user) {
          session.user.id = user.id
          session.user.subscriptionStatus = user.subscription_status
          session.user.trialEndDate = user.trial_end_date
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }



