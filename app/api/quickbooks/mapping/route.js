import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

/**
 * GET /api/quickbooks/mapping?shopId=xxx
 * Fetches the QuickBooks account mapping for a shop
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const shopId = searchParams.get('shopId')

    if (!shopId) {
      return NextResponse.json(
        { error: 'shopId is required' },
        { status: 400 }
      )
    }

    // TODO: Get userId from session
    const userId = 'TODO_GET_FROM_SESSION'

    // Fetch mapping from database
    const { data: mapping, error } = await supabase
      .from('quickbooks_account_mappings')
      .select('*')
      .eq('shop_id', shopId)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      throw error
    }

    return NextResponse.json({
      success: true,
      mapping: mapping || null,
    })
  } catch (error) {
    console.error('Fetch QuickBooks mapping error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch account mapping' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/quickbooks/mapping
 * Saves or updates the QuickBooks account mapping for a shop
 */
export async function POST(request) {
  try {
    const body = await request.json()
    const {
      shopId,
      revenueAccountId,
      platformFeesAccountId,
      paymentFeesAccountId,
      shippingIncomeAccountId,
      shippingExpenseAccountId,
      affiliateCommissionAccountId,
      refundsAccountId,
      adjustmentsAccountId,
      clearingAccountId,
    } = body

    // Validate required fields
    if (!shopId || !revenueAccountId || !clearingAccountId) {
      return NextResponse.json(
        { error: 'shopId, revenueAccountId, and clearingAccountId are required' },
        { status: 400 }
      )
    }

    // TODO: Get userId from session
    const userId = 'TODO_GET_FROM_SESSION'

    // Check if mapping exists
    const { data: existingMapping } = await supabase
      .from('quickbooks_account_mappings')
      .select('id')
      .eq('shop_id', shopId)
      .single()

    const mappingData = {
      user_id: userId,
      shop_id: shopId,
      revenue_account_id: revenueAccountId,
      platform_fees_account_id: platformFeesAccountId,
      payment_fees_account_id: paymentFeesAccountId,
      shipping_income_account_id: shippingIncomeAccountId,
      shipping_expense_account_id: shippingExpenseAccountId,
      affiliate_commission_account_id: affiliateCommissionAccountId,
      refunds_account_id: refundsAccountId,
      adjustments_account_id: adjustmentsAccountId,
      clearing_account_id: clearingAccountId,
    }

    let result
    if (existingMapping) {
      // Update existing mapping
      result = await supabase
        .from('quickbooks_account_mappings')
        .update(mappingData)
        .eq('id', existingMapping.id)
        .select()
        .single()
    } else {
      // Create new mapping
      result = await supabase
        .from('quickbooks_account_mappings')
        .insert(mappingData)
        .select()
        .single()
    }

    if (result.error) {
      throw result.error
    }

    return NextResponse.json({
      success: true,
      mapping: result.data,
    })
  } catch (error) {
    console.error('Save QuickBooks mapping error:', error)
    return NextResponse.json(
      { error: 'Failed to save account mapping' },
      { status: 500 }
    )
  }
}


