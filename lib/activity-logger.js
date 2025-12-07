import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for logging
)

/**
 * Log user activity to Supabase
 * @param {string} userId - User ID
 * @param {string} eventType - Type of event (signup, login, logout, etc.)
 * @param {object} eventData - Additional data about the event
 * @param {object} request - Next.js request object (optional)
 */
export async function logActivity(userId, eventType, eventData = {}, request = null) {
  try {
    const activityLog = {
      user_id: userId,
      event_type: eventType,
      event_data: eventData,
      ip_address: request ? getClientIP(request) : null,
      user_agent: request?.headers?.get('user-agent') || null,
    }

    const { error } = await supabase
      .from('user_activity_log')
      .insert([activityLog])

    if (error) {
      console.error('Error logging activity:', error)
    }
  } catch (err) {
    console.error('Error in logActivity:', err)
  }
}

/**
 * Get client IP address from request
 */
function getClientIP(request) {
  // Try various headers that might contain the real IP
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfIP = request.headers.get('cf-connecting-ip') // Cloudflare
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (cfIP) {
    return cfIP
  }
  
  return null
}

/**
 * Get user activity summary
 */
export async function getUserActivitySummary(userId) {
  try {
    const { data, error } = await supabase
      .from('user_activity_summary')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error getting activity summary:', error)
      return null
    }

    return data
  } catch (err) {
    console.error('Error in getUserActivitySummary:', err)
    return null
  }
}

/**
 * Get recent activity for a user
 */
export async function getUserRecentActivity(userId, limit = 10) {
  try {
    const { data, error } = await supabase
      .from('user_activity_log')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) {
      console.error('Error getting recent activity:', error)
      return []
    }

    return data
  } catch (err) {
    console.error('Error in getUserRecentActivity:', err)
    return []
  }
}

/**
 * Get all signups for a date range
 */
export async function getSignupsByDateRange(startDate, endDate) {
  try {
    const { data, error } = await supabase
      .from('user_activity_log')
      .select('*')
      .eq('event_type', 'signup')
      .gte('created_at', startDate)
      .lte('created_at', endDate)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error getting signups:', error)
      return []
    }

    return data
  } catch (err) {
    console.error('Error in getSignupsByDateRange:', err)
    return []
  }
}

/**
 * Get login statistics
 */
export async function getLoginStats() {
  try {
    const { data, error } = await supabase
      .from('user_activity_log')
      .select('created_at')
      .eq('event_type', 'login')

    if (error) {
      console.error('Error getting login stats:', error)
      return {
        total: 0,
        today: 0,
        thisWeek: 0,
        thisMonth: 0
      }
    }

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    return {
      total: data.length,
      today: data.filter(log => new Date(log.created_at) >= today).length,
      thisWeek: data.filter(log => new Date(log.created_at) >= weekAgo).length,
      thisMonth: data.filter(log => new Date(log.created_at) >= monthAgo).length
    }
  } catch (err) {
    console.error('Error in getLoginStats:', err)
    return {
      total: 0,
      today: 0,
      thisWeek: 0,
      thisMonth: 0
    }
  }
}

