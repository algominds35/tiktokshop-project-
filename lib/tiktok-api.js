import axios from 'axios'
import crypto from 'crypto'

const TIKTOK_API_BASE = 'https://open-api.tiktokglobalshop.com'
const APP_KEY = process.env.TIKTOK_APP_KEY
const APP_SECRET = process.env.TIKTOK_APP_SECRET

// Generate TikTok API signature
function generateSignature(path, timestamp, params = {}) {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}${params[key]}`)
    .join('')
  
  const signString = `${APP_SECRET}${path}${timestamp}${sortedParams}${APP_SECRET}`
  
  return crypto
    .createHmac('sha256', APP_SECRET)
    .update(signString)
    .digest('hex')
}

// TikTok API client
export class TikTokAPI {
  constructor(accessToken) {
    this.accessToken = accessToken
  }

  async request(path, params = {}) {
    const timestamp = Math.floor(Date.now() / 1000)
    const signature = generateSignature(path, timestamp, {
      app_key: APP_KEY,
      timestamp,
      access_token: this.accessToken,
      ...params,
    })

    try {
      const response = await axios.get(`${TIKTOK_API_BASE}${path}`, {
        params: {
          app_key: APP_KEY,
          timestamp,
          access_token: this.accessToken,
          sign: signature,
          ...params,
        },
      })

      if (response.data.code !== 0) {
        throw new Error(response.data.message || 'TikTok API error')
      }

      return response.data.data
    } catch (error) {
      console.error('TikTok API request failed:', error)
      throw error
    }
  }

  // Fetch orders with all fee details
  async getOrders(shopId, startTime, endTime) {
    const path = '/order/202309/orders/search'
    
    const params = {
      shop_id: shopId,
      create_time_from: startTime,
      create_time_to: endTime,
      page_size: 50,
    }

    const orders = []
    let page = 1
    let hasMore = true

    while (hasMore) {
      const response = await this.request(path, { ...params, page })
      
      if (response.orders && response.orders.length > 0) {
        orders.push(...response.orders)
        page++
        hasMore = response.more
      } else {
        hasMore = false
      }
    }

    return orders
  }

  // Get order details with fee breakdown
  async getOrderDetails(orderId) {
    const path = '/order/202309/orders'
    return await this.request(path, { order_id: orderId })
  }

  // Get shop information
  async getShopInfo() {
    const path = '/shop/202309/shops'
    return await this.request(path)
  }
}

// OAuth helpers
export function getAuthorizationUrl(state) {
  const params = new URLSearchParams({
    app_key: APP_KEY,
    state,
    redirect_uri: process.env.TIKTOK_REDIRECT_URI,
  })

  return `https://services.tiktokshop.com/open/authorize?${params.toString()}`
}

export async function exchangeCodeForToken(code) {
  const path = '/token/202309/get'
  const timestamp = Math.floor(Date.now() / 1000)
  
  const params = {
    app_key: APP_KEY,
    auth_code: code,
    grant_type: 'authorized_code',
  }

  const signature = generateSignature(path, timestamp, {
    ...params,
    timestamp,
  })

  try {
    const response = await axios.get(`${TIKTOK_API_BASE}${path}`, {
      params: {
        ...params,
        timestamp,
        sign: signature,
      },
    })

    if (response.data.code !== 0) {
      throw new Error(response.data.message || 'Token exchange failed')
    }

    return response.data.data
  } catch (error) {
    console.error('Token exchange failed:', error)
    throw error
  }
}

export async function refreshAccessToken(refreshToken) {
  const path = '/token/202309/refresh'
  const timestamp = Math.floor(Date.now() / 1000)
  
  const params = {
    app_key: APP_KEY,
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
  }

  const signature = generateSignature(path, timestamp, {
    ...params,
    timestamp,
  })

  try {
    const response = await axios.get(`${TIKTOK_API_BASE}${path}`, {
      params: {
        ...params,
        timestamp,
        sign: signature,
      },
    })

    if (response.data.code !== 0) {
      throw new Error(response.data.message || 'Token refresh failed')
    }

    return response.data.data
  } catch (error) {
    console.error('Token refresh failed:', error)
    throw error
  }
}

