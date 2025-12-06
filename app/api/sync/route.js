import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { TikTokAPI } from '@/lib/tiktok-api'
import { db } from '@/lib/supabase'
import { calculateProfit, calculateProductProfits } from '@/lib/profit-calculator'

export const dynamic = 'force-dynamic'

export async function POST(request) {
  try {
    // Get user from session
    const userId = cookies().get('user_id')?.value

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user and verify subscription
    const user = await db.getUser(userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Check subscription status
    if (user.subscription_status !== 'active' && user.subscription_status !== 'trial') {
      return NextResponse.json(
        { error: 'Subscription required' },
        { status: 403 }
      )
    }

    // Get TikTok connection
    const connection = await db.getTikTokConnection(userId)
    if (!connection) {
      return NextResponse.json(
        { error: 'TikTok Shop not connected' },
        { status: 400 }
      )
    }

    // Initialize TikTok API client
    const tiktokApi = new TikTokAPI(connection.access_token)

    // Fetch orders from last 30 days
    const endTime = Math.floor(Date.now() / 1000)
    const startTime = endTime - (30 * 24 * 60 * 60)

    const orders = await tiktokApi.getOrders(
      connection.shop_id,
      startTime,
      endTime
    )

    // Calculate overall profit
    const profitData = calculateProfit(orders)

    // Calculate product-level profits
    const productProfits = calculateProductProfits(orders)

    // Save profit snapshot
    const snapshot = await db.createProfitSnapshot({
      user_id: userId,
      revenue: profitData.grossRevenue,
      fees: profitData.totalFees,
      profit: profitData.netProfit,
      margin: profitData.margin,
      date: new Date().toISOString(),
      fee_breakdown: profitData.fees,
    })

    // Save product profits
    if (productProfits.length > 0) {
      const productProfitsData = productProfits.map(product => ({
        snapshot_id: snapshot.id,
        product_name: product.productName,
        revenue: product.revenue,
        fees: product.fees,
        profit: product.profit,
        margin: product.margin,
      }))

      await db.saveProductProfits(productProfitsData)
    }

    return NextResponse.json({
      success: true,
      snapshot: {
        ...snapshot,
        products: productProfits,
      },
    })
  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json(
      { error: 'Failed to sync data', details: error.message },
      { status: 500 }
    )
  }
}

