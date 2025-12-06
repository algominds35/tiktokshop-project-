// TypeScript types for QuickBooks integration

export type QuickBooksConnection = {
  id: string
  userId: string
  shopId: string
  realmId: string
  accessToken: string
  refreshToken: string
  accessTokenExpiresAt: string // ISO timestamp
  createdAt: string
  updatedAt: string
}

export type QuickBooksAccountMapping = {
  id: string
  userId: string
  shopId: string
  revenueAccountId: string
  platformFeesAccountId: string
  paymentFeesAccountId: string
  shippingIncomeAccountId: string
  shippingExpenseAccountId: string
  affiliateCommissionAccountId: string
  refundsAccountId: string
  adjustmentsAccountId: string
  clearingAccountId: string
  createdAt: string
  updatedAt: string
}

export type TikTokSettlement = {
  id: string
  userId: string
  shopId: string
  periodStart: string // ISO timestamp
  periodEnd: string // ISO timestamp
  currency: string
  grossRevenue: number
  platformFees: number
  paymentFees: number
  shippingCost: number
  customerShippingPaid: number
  affiliateCommissions: number
  refunds: number
  adjustments: number
  netPayout: number
  quickbooksJournalEntryId?: string | null
  createdAt: string
  updatedAt: string
}

export type QuickBooksAccount = {
  id: string
  name: string
  fullyQualifiedName: string
  type: string
  subType: string
  active: boolean
}

export type JournalEntryLine = {
  DetailType: 'JournalEntryLineDetail'
  Amount: number
  JournalEntryLineDetail: {
    PostingType: 'Debit' | 'Credit'
    AccountRef: {
      value: string // Account ID
    }
  }
}

export type JournalEntryRequest = {
  TxnDate: string // YYYY-MM-DD
  PrivateNote?: string
  Line: JournalEntryLine[]
}

export type JournalEntryResponse = {
  Id: string
  TxnDate: string
  SyncToken: string
  MetaData: {
    CreateTime: string
    LastUpdatedTime: string
  }
  Line: JournalEntryLine[]
}

export type QuickBooksAPIError = {
  Fault: {
    Error: Array<{
      Message: string
      Detail: string
      code: string
      element: string
    }>
    type: string
  }
  time: string
}

