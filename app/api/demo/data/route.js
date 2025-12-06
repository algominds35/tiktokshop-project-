import { NextResponse } from 'next/server'

/**
 * GET /api/demo/data
 * Returns demo profit data for testing/showcasing the dashboard
 */
export async function GET(request) {
  // Generate realistic demo data
  const demoData = {
    revenue: 10245.50,
    fees: 2458.30,
    profit: 7787.20,
    margin: 76.0,
    date: new Date().toISOString(),
    fee_breakdown: {
      platformFees: 1450.00,
      paymentFees: 580.00,
      shippingFees: 280.30,
      commissions: 148.00,
      refunds: 0.00,
    },
    products: [
      {
        productName: 'Wireless Bluetooth Earbuds',
        revenue: 4250.00,
        fees: 950.00,
        profit: 3300.00,
        margin: 77.6,
      },
      {
        productName: 'Premium Phone Case',
        revenue: 3580.00,
        fees: 825.00,
        profit: 2755.00,
        margin: 76.9,
      },
      {
        productName: 'USB-C Fast Charging Cable',
        revenue: 2415.50,
        fees: 683.30,
        profit: 1732.20,
        margin: 71.7,
      },
      {
        productName: 'Tempered Glass Screen Protector',
        revenue: 890.00,
        fees: 425.00,
        profit: 465.00,
        margin: 52.2,
      },
      {
        productName: '3-in-1 Wireless Charging Dock',
        revenue: 550.00,
        fees: 285.00,
        profit: 265.00,
        margin: 48.2,
      },
      {
        productName: 'Car Phone Mount',
        revenue: 380.00,
        fees: 210.00,
        profit: 170.00,
        margin: 44.7,
      },
      {
        productName: 'Portable Power Bank 20000mAh',
        revenue: 180.00,
        fees: 80.00,
        profit: 100.00,
        margin: 55.6,
      },
    ],
  }

  return NextResponse.json({
    success: true,
    data: demoData,
    isDemo: true,
  })
}

