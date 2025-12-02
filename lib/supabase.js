import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Client for browser/client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations with elevated privileges
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Database operations
export const db = {
  // User operations
  async getUser(userId) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()
    
    if (error) throw error
    return data
  },

  async getUserByEmail(email) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async createUser(userData) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert(userData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async updateUser(userId, updates) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // TikTok connection operations
  async getTikTokConnection(userId) {
    const { data, error } = await supabaseAdmin
      .from('tiktok_connections')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async saveTikTokConnection(connectionData) {
    const { data, error } = await supabaseAdmin
      .from('tiktok_connections')
      .upsert(connectionData, { onConflict: 'user_id' })
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Profit snapshot operations
  async createProfitSnapshot(snapshotData) {
    const { data, error } = await supabaseAdmin
      .from('profit_snapshots')
      .insert(snapshotData)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  async getLatestSnapshot(userId) {
    const { data, error } = await supabaseAdmin
      .from('profit_snapshots')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(1)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async getSnapshots(userId, limit = 30) {
    const { data, error } = await supabaseAdmin
      .from('profit_snapshots')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(limit)
    
    if (error) throw error
    return data || []
  },

  // Product profit operations
  async saveProductProfits(productProfits) {
    const { data, error } = await supabaseAdmin
      .from('product_profits')
      .insert(productProfits)
      .select()
    
    if (error) throw error
    return data
  },

  async getProductProfits(snapshotId) {
    const { data, error } = await supabaseAdmin
      .from('product_profits')
      .select('*')
      .eq('snapshot_id', snapshotId)
      .order('profit', { ascending: false })
    
    if (error) throw error
    return data || []
  },
}

