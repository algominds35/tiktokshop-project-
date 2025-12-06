import { NextResponse } from 'next/server'
import { db } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

/**
 * GET /api/settlements
 * Fetches all settlements for the current user
 */
export async function GET(request) {
  try {
    // Get userId from session
    const { getUserId } = await import('@/lib/auth')
    const userId = getUserId()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const settlements = await db.getSettlements(userId)

    return NextResponse.json({
      success: true,
      settlements: settlements,
    })
  } catch (error) {
    console.error('Fetch settlements error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settlements' },
      { status: 500 }
    )
  }
}

