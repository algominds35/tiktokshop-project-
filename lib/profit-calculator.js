// Calculate profit from TikTok orders
export function calculateProfit(orders) {
  if (!orders || orders.length === 0) {
    return {
      grossRevenue: 0,
      totalFees: 0,
      netProfit: 0,
      margin: 0,
      fees: {
        platformFees: 0,
        paymentFees: 0,
        shippingFees: 0,
        commissions: 0,
        refunds: 0,
      },
    }
  }

  let grossRevenue = 0
  let platformFees = 0
  let paymentFees = 0
  let shippingFees = 0
  let commissions = 0
  let refunds = 0

  orders.forEach(order => {
    // Only process completed/paid orders
    if (order.status === 'COMPLETED' || order.status === 'DELIVERED') {
      // Gross revenue
      const saleAmount = parseFloat(order.payment?.total_amount || 0)
      grossRevenue += saleAmount

      // Platform fees
      const platformFee = parseFloat(order.payment?.platform_fee || 0)
      platformFees += platformFee

      // Payment processing fees
      const paymentFee = parseFloat(order.payment?.payment_processing_fee || 0)
      paymentFees += paymentFee

      // Shipping fees (charged to seller)
      const shippingFee = parseFloat(order.payment?.seller_shipping_fee || 0)
      shippingFees += shippingFee

      // Affiliate commissions
      const commission = parseFloat(order.payment?.affiliate_commission || 0)
      commissions += commission
    }

    // Handle refunds separately
    if (order.status === 'CANCELLED' || order.refund_status === 'REFUNDED') {
      const refundAmount = parseFloat(order.payment?.refund_amount || 0)
      refunds += refundAmount
    }
  })

  const totalFees = platformFees + paymentFees + shippingFees + commissions + refunds
  const netProfit = grossRevenue - totalFees
  const margin = grossRevenue > 0 ? (netProfit / grossRevenue) * 100 : 0

  return {
    grossRevenue: parseFloat(grossRevenue.toFixed(2)),
    totalFees: parseFloat(totalFees.toFixed(2)),
    netProfit: parseFloat(netProfit.toFixed(2)),
    margin: parseFloat(margin.toFixed(2)),
    fees: {
      platformFees: parseFloat(platformFees.toFixed(2)),
      paymentFees: parseFloat(paymentFees.toFixed(2)),
      shippingFees: parseFloat(shippingFees.toFixed(2)),
      commissions: parseFloat(commissions.toFixed(2)),
      refunds: parseFloat(refunds.toFixed(2)),
    },
  }
}

// Calculate profit by product
export function calculateProductProfits(orders) {
  const productMap = new Map()

  orders.forEach(order => {
    // Only process completed/paid orders
    if (order.status !== 'COMPLETED' && order.status !== 'DELIVERED') {
      return
    }

    order.item_list?.forEach(item => {
      const productName = item.product_name || 'Unknown Product'
      const productId = item.product_id

      if (!productMap.has(productId)) {
        productMap.set(productId, {
          productName,
          revenue: 0,
          platformFees: 0,
          paymentFees: 0,
          shippingFees: 0,
          commissions: 0,
        })
      }

      const product = productMap.get(productId)

      // Calculate item revenue
      const itemRevenue = parseFloat(item.sale_price || 0) * parseInt(item.quantity || 1)
      product.revenue += itemRevenue

      // Allocate fees proportionally based on item revenue vs order total
      const orderTotal = parseFloat(order.payment?.total_amount || 0)
      if (orderTotal > 0) {
        const proportion = itemRevenue / orderTotal

        product.platformFees += parseFloat(order.payment?.platform_fee || 0) * proportion
        product.paymentFees += parseFloat(order.payment?.payment_processing_fee || 0) * proportion
        product.shippingFees += parseFloat(order.payment?.seller_shipping_fee || 0) * proportion
        product.commissions += parseFloat(order.payment?.affiliate_commission || 0) * proportion
      }
    })
  })

  // Convert map to array and calculate totals
  const products = Array.from(productMap.values()).map(product => {
    const totalFees = product.platformFees + product.paymentFees + product.shippingFees + product.commissions
    const profit = product.revenue - totalFees
    const margin = product.revenue > 0 ? (profit / product.revenue) * 100 : 0

    return {
      productName: product.productName,
      revenue: parseFloat(product.revenue.toFixed(2)),
      fees: parseFloat(totalFees.toFixed(2)),
      profit: parseFloat(profit.toFixed(2)),
      margin: parseFloat(margin.toFixed(2)),
    }
  })

  // Sort by profit descending
  return products.sort((a, b) => b.profit - a.profit)
}

// Get margin color based on percentage
export function getMarginColor(margin) {
  if (margin >= 70) return 'green'
  if (margin >= 40) return 'yellow'
  return 'red'
}

// Get margin CSS classes for Tailwind
export function getMarginClass(margin) {
  if (margin >= 70) return 'text-green-600 bg-green-50'
  if (margin >= 40) return 'text-yellow-600 bg-yellow-50'
  return 'text-red-600 bg-red-50'
}

