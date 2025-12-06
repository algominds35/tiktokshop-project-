import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import {
  getQuickBooksAccessTokenForShop,
  buildJournalEntryFromSettlement,
  createJournalEntry,
} from '@/lib/quickbooks-api'

export const dynamic = 'force-dynamic'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

/**
 * POST /api/quickbooks/settlements/[settlementId]/sync
 * Syncs a TikTok settlement to QuickBooks as a Journal Entry
 */
export async function POST(request, { params }) {
  try {
    const { settlementId } = params

    if (!settlementId) {
      return NextResponse.json(
        { error: 'settlementId is required' },
        { status: 400 }
      )
    }

    // TODO: Get userId from session and validate access
    const userId = 'TODO_GET_FROM_SESSION'

    // 1. Load the TikTok settlement from database
    const { data: settlement, error: settlementError } = await supabase
      .from('tiktok_settlements')
      .select('*')
      .eq('id', settlementId)
      .single()

    if (settlementError || !settlement) {
      return NextResponse.json(
        { error: 'Settlement not found' },
        { status: 404 }
      )
    }

    // Check if already synced
    if (settlement.quickbooks_journal_entry_id) {
      return NextResponse.json(
        { 
          error: 'Settlement already synced to QuickBooks',
          journalEntryId: settlement.quickbooks_journal_entry_id,
        },
        { status: 400 }
      )
    }

    const shopId = settlement.shop_id

    // 2. Load QuickBooks connection for this shop
    const { data: connection, error: connectionError } = await supabase
      .from('quickbooks_connections')
      .select('*')
      .eq('shop_id', shopId)
      .single()

    if (connectionError || !connection) {
      return NextResponse.json(
        { 
          error: 'QuickBooks not connected for this shop. Please connect QuickBooks first.',
          code: 'NO_CONNECTION',
        },
        { status: 400 }
      )
    }

    // 3. Load account mapping for this shop
    const { data: mapping, error: mappingError } = await supabase
      .from('quickbooks_account_mappings')
      .select('*')
      .eq('shop_id', shopId)
      .single()

    if (mappingError || !mapping) {
      return NextResponse.json(
        { 
          error: 'QuickBooks account mapping not configured. Please configure account mappings first.',
          code: 'NO_MAPPING',
        },
        { status: 400 }
      )
    }

    // 4. Get valid access token (handles refresh)
    let accessToken, realmId
    try {
      const tokenData = await getQuickBooksAccessTokenForShop(shopId)
      accessToken = tokenData.accessToken
      realmId = tokenData.realmId
    } catch (error) {
      console.error('Failed to get QuickBooks access token:', error)
      return NextResponse.json(
        { 
          error: 'Failed to authenticate with QuickBooks. Please reconnect your account.',
          code: 'AUTH_FAILED',
        },
        { status: 401 }
      )
    }

    // 5. Build journal entry JSON
    const journalEntryData = buildJournalEntryFromSettlement(settlement, mapping)

    // Validate that the journal entry has lines
    if (!journalEntryData.Line || journalEntryData.Line.length === 0) {
      return NextResponse.json(
        { error: 'No journal entry lines generated. Check settlement data.' },
        { status: 400 }
      )
    }

    // 6. Create journal entry in QuickBooks
    let journalEntry
    try {
      journalEntry = await createJournalEntry(accessToken, realmId, journalEntryData)
    } catch (error) {
      console.error('QuickBooks API error:', error)
      return NextResponse.json(
        { 
          error: 'Failed to create journal entry in QuickBooks. Please check your account mappings and try again.',
          details: error.message,
        },
        { status: 500 }
      )
    }

    // 7. Update settlement with QuickBooks journal entry ID
    const { error: updateError } = await supabase
      .from('tiktok_settlements')
      .update({
        quickbooks_journal_entry_id: journalEntry.Id,
      })
      .eq('id', settlementId)

    if (updateError) {
      console.error('Failed to update settlement with journal entry ID:', updateError)
      // Journal entry was created but we failed to record the ID
      // This is not critical - we'll just log it
    }

    return NextResponse.json({
      success: true,
      message: 'Settlement synced to QuickBooks successfully',
      journalEntry: {
        id: journalEntry.Id,
        txnDate: journalEntry.TxnDate,
        syncKey: journalEntry.SyncToken,
      },
    })
  } catch (error) {
    console.error('Settlement sync error:', error)
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred while syncing to QuickBooks',
        details: error.message,
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/quickbooks/settlements/[settlementId]/sync
 * Check sync status of a settlement
 */
export async function GET(request, { params }) {
  try {
    const { settlementId } = params

    // Get userId from session and validate access
    const { getUserId } = await import('@/lib/auth')
    const userId = getUserId()
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { data: settlement, error } = await supabase
      .from('tiktok_settlements')
      .select('id, quickbooks_journal_entry_id')
      .eq('id', settlementId)
      .single()

    if (error || !settlement) {
      return NextResponse.json(
        { error: 'Settlement not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      synced: !!settlement.quickbooks_journal_entry_id,
      journalEntryId: settlement.quickbooks_journal_entry_id,
    })
  } catch (error) {
    console.error('Check sync status error:', error)
    return NextResponse.json(
      { error: 'Failed to check sync status' },
      { status: 500 }
    )
  }
}


