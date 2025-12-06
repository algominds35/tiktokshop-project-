-- QuickBooks Integration Schema
-- Add this to your existing Supabase database

-- QuickBooks connections table (OAuth tokens)
CREATE TABLE quickbooks_connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  shop_id VARCHAR(255) NOT NULL,
  realm_id VARCHAR(255) NOT NULL,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  access_token_expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, shop_id)
);

-- QuickBooks account mappings table
CREATE TABLE quickbooks_account_mappings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  shop_id VARCHAR(255) NOT NULL,
  revenue_account_id VARCHAR(255) NOT NULL,
  platform_fees_account_id VARCHAR(255) NOT NULL,
  payment_fees_account_id VARCHAR(255) NOT NULL,
  shipping_income_account_id VARCHAR(255) NOT NULL,
  shipping_expense_account_id VARCHAR(255) NOT NULL,
  affiliate_commission_account_id VARCHAR(255) NOT NULL,
  refunds_account_id VARCHAR(255) NOT NULL,
  adjustments_account_id VARCHAR(255) NOT NULL,
  clearing_account_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, shop_id)
);

-- TikTok settlements table (add this if not exists, or just add the quickbooks_journal_entry_id column)
CREATE TABLE IF NOT EXISTS tiktok_settlements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  shop_id VARCHAR(255) NOT NULL,
  period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  currency VARCHAR(10) DEFAULT 'USD',
  gross_revenue DECIMAL(10, 2) DEFAULT 0,
  platform_fees DECIMAL(10, 2) DEFAULT 0,
  payment_fees DECIMAL(10, 2) DEFAULT 0,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  customer_shipping_paid DECIMAL(10, 2) DEFAULT 0,
  affiliate_commissions DECIMAL(10, 2) DEFAULT 0,
  refunds DECIMAL(10, 2) DEFAULT 0,
  adjustments DECIMAL(10, 2) DEFAULT 0,
  net_payout DECIMAL(10, 2) DEFAULT 0,
  quickbooks_journal_entry_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_quickbooks_connections_user_shop ON quickbooks_connections(user_id, shop_id);
CREATE INDEX idx_quickbooks_connections_realm ON quickbooks_connections(realm_id);
CREATE INDEX idx_quickbooks_mappings_user_shop ON quickbooks_account_mappings(user_id, shop_id);
CREATE INDEX idx_tiktok_settlements_user_shop ON tiktok_settlements(user_id, shop_id);
CREATE INDEX idx_tiktok_settlements_qb_journal ON tiktok_settlements(quickbooks_journal_entry_id);

-- Add triggers for updated_at
CREATE TRIGGER update_quickbooks_connections_updated_at
  BEFORE UPDATE ON quickbooks_connections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quickbooks_mappings_updated_at
  BEFORE UPDATE ON quickbooks_account_mappings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tiktok_settlements_updated_at
  BEFORE UPDATE ON tiktok_settlements
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE quickbooks_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE quickbooks_account_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE tiktok_settlements ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can read own QB connections" ON quickbooks_connections
  FOR SELECT USING (true);

CREATE POLICY "Users can read own QB mappings" ON quickbooks_account_mappings
  FOR SELECT USING (true);

CREATE POLICY "Users can read own settlements" ON tiktok_settlements
  FOR SELECT USING (true);

