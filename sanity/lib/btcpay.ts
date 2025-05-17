import axios from 'axios';

interface InvoiceParams {
  amount: number;
  orderId: string;
  redirectUrl?: string;
  notificationUrl?: string;
}

export async function createBTCPayInvoice(params: InvoiceParams) {
  if (!process.env.BTCPAY_SERVER_URL || !process.env.BTCPAY_API_KEY || !process.env.BTCPAY_STORE_ID) {
    throw new Error('BTC Pay Server configuration is missing');
  }

  try {
    const response = await axios.post(
      `${process.env.BTCPAY_SERVER_URL}/api/v1/stores/${process.env.BTCPAY_STORE_ID}/invoices`,
      {
        amount: params.amount,
        currency: "USD",
        metadata: {
          orderId: params.orderId,
        },
        checkout: {
          redirectURL: params.redirectUrl || `${process.env.NEXT_PUBLIC_BASE_URL}/thank-you`,
          notificationURL: params.notificationUrl || `${process.env.BTCPAY_SERVER_URL}/api/v1/invoices/webhook`,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${process.env.BTCPAY_API_KEY}`,
        },
      }
    );

    return {
      invoiceId: response.data.id,
      paymentUrl: response.data.checkoutLink,
      status: response.data.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create invoice');
    }
    throw error;
  }
}