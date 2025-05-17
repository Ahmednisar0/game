// app/api/create-invoice/route.ts
import { NextResponse } from 'next/server'

interface InvoiceRequest {
  amount: number;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  customer: {
    name: string;
    email: string;
    address?: string;
    city?: string;
    country?: string;
    zipCode?: string;
  };
  metadata?: Record<string, any>;
}

export async function POST(request: Request) {
  // 1. Verify environment variables
  const { BTCPAY_API_KEY, BTCPAY_STORE_ID, NEXTAUTH_URL } = process.env;
  if (!BTCPAY_API_KEY || !BTCPAY_STORE_ID) {
    console.error('Missing BTCPay configuration');
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 }
    );
  }

  try {
    // 2. Parse and validate request
    const { amount, items, customer, metadata }: InvoiceRequest = await request.json();

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount provided' },
        { status: 400 }
      );
    }

    // 3. Prepare complete metadata
    const completeMetadata = {
      ...metadata,
      source: "nextjs-app",
      orderDetails: {
        items,
        customer,
        timestamp: new Date().toISOString()
      }
    };

    // 4. Create BTCPay invoice
    const invoiceResponse = await fetch(
      `https://btcpay0.voltageapp.io/api/v1/stores/${BTCPAY_STORE_ID}/invoices`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${BTCPAY_API_KEY}`
        },
        body: JSON.stringify({
          amount,
          currency: "USD",
          metadata: completeMetadata,
          checkout: {
            redirectURL: `${NEXTAUTH_URL || 'https://www.gamifox.com'}/payment-success`,
            redirectAutomatically: true,
            paymentMethods: ["BTC"], // Ensure only BTC is shown
            defaultPaymentMethod: "BTC"
          }
        })
      }
    );

    // 5. Handle response
    const responseData = await invoiceResponse.json();
    
    if (!invoiceResponse.ok) {
      console.error('BTCPay API Error:', responseData);
      return NextResponse.json(
        { error: responseData.message || 'Invoice creation failed' },
        { status: invoiceResponse.status }
      );
    }

    if (!responseData.checkoutLink) {
      throw new Error('Missing checkoutLink in response');
    }

    // 6. Return complete payment data including QR code information
    return NextResponse.json({
      paymentUrl: responseData.checkoutLink,
      invoiceId: responseData.id,
      qrData: {
        bitcoinAddress: responseData.addresses?.BTC,
        amountBtc: responseData.amountDue, // in BTC
        amountFiat: amount, // in USD
        memo: `Payment for order ${responseData.id}`,
        expiration: responseData.expirationTime
      }
    });

  } catch (error: any) {
    console.error('Invoice creation error:', error);
    return NextResponse.json(
      { 
        error: 'Payment processing failed',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}