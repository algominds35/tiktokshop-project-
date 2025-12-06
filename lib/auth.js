// Simple authentication helpers
import { cookies } from 'next/headers'
import { db } from './supabase'
import crypto from 'crypto'

/**
 * Get current user from session cookie
 */
export async function getCurrentUser() {
  try {
    const sessionToken = cookies().get('session_token')?.value
    
    if (!sessionToken) {
      return null
    }

    // Simple session lookup - in production you'd want proper session management
    const userId = cookies().get('user_id')?.value
    
    if (!userId) {
      return null
    }

    const user = await db.getUser(userId)
    return user
  } catch (error) {
    console.error('Get current user error:', error)
    return null
  }
}

/**
 * Get user ID from session (for API routes)
 */
export function getUserId() {
  const userId = cookies().get('user_id')?.value
  return userId || null
}

/**
 * Create session for user
 */
export function createSession(userId) {
  const sessionToken = crypto.randomBytes(32).toString('hex')
  
  // Set cookies (7 days expiry)
  const maxAge = 7 * 24 * 60 * 60 // 7 days in seconds
  
  cookies().set('session_token', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: maxAge,
    path: '/',
  })
  
  cookies().set('user_id', userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: maxAge,
    path: '/',
  })
  
  return sessionToken
}

/**
 * Clear session (logout)
 */
export function clearSession() {
  cookies().delete('session_token')
  cookies().delete('user_id')
}

/**
 * Sign up new user
 */
export async function signUp(email) {
  try {
    // Check if user exists
    const existing = await db.getUserByEmail(email)
    if (existing) {
      return { error: 'Email already registered', user: null }
    }

    // Create user
    const user = await db.createUser({
      email: email,
      subscription_status: 'trial', // 7-day trial
    })

    // Create session
    createSession(user.id)

    return { user, error: null }
  } catch (error) {
    console.error('Sign up error:', error)
    return { error: 'Failed to create account', user: null }
  }
}

/**
 * Login existing user
 */
export async function login(email) {
  try {
    const user = await db.getUserByEmail(email)
    
    if (!user) {
      return { error: 'Account not found. Please sign up first.', user: null }
    }

    // Create session
    createSession(user.id)

    return { user, error: null }
  } catch (error) {
    console.error('Login error:', error)
    return { error: 'Failed to login', user: null }
  }
}

/**
 * Require authentication (for API routes)
 */
export function requireAuth() {
  const userId = getUserId()
  
  if (!userId) {
    return { authenticated: false, userId: null }
  }
  
  return { authenticated: true, userId }
}

