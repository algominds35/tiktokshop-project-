import { NextResponse } from 'next/server'
import { logActivity } from '@/lib/activity-logger'

export async function POST(request) {
  try {
    const { userId, eventType, eventData } = await request.json()

    if (!userId || !eventType) {
      return NextResponse.json(
        { error: 'userId and eventType are required' },
        { status: 400 }
      )
    }

    // Log the activity
    await logActivity(userId, eventType, eventData || {}, request)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error logging activity:', error)
    return NextResponse.json(
      { error: 'Failed to log activity' },
      { status: 500 }
    )
  }
}

