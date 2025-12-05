import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(request) {
  try {
    // Get user from session
    const userId = cookies().get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get latest profit snapshot
    const snapshot = await db.getLatestSnapshot(userId)

    if (!snapshot) {
      return NextResponse.json({
        success: true,
        data: null,
        message: 'No data available. Click "Sync Now" to fetch your TikTok Shop data.',
      })
    }

    // Get product profits for this snapshot
    const products = await db.getProductProfits(snapshot.id)

    return NextResponse.json({
      success: true,
      data: {
        ...snapshot,
        products,
      },
    })
  } catch (error) {
    console.error('Profit fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch profit data' },
      { status: 500 }
    )
  }
}

