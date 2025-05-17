import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const config = {
      BTCPAY_SERVER_URL: process.env.BTCPAY_SERVER_URL,
      BTCPAY_STORE_ID: process.env.BTCPAY_STORE_ID,
      // Don't expose API key in response
      hasApiKey: !!process.env.BTCPAY_API_KEY,
      NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL
    }

    return NextResponse.json(config)
  } catch (error) {
    return NextResponse.json(
      { error: 'Configuration check failed' },
      { status: 500 }
    )
  }
}