/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for BTCPay API calls
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { 
            key: 'Access-Control-Allow-Origin', 
            value: '*' 
          },
          { 
            key: 'Access-Control-Allow-Methods', 
            value: 'GET, POST, OPTIONS' 
          },
          { 
            key: 'Access-Control-Allow-Headers', 
            value: 'Content-Type, Authorization' 
          }
        ]
      }
    ]
  },
  
  // Environment variables for client-side usage
  env: {
    NEXT_PUBLIC_BTCPAY_URL: process.env.BTCPAY_URL,
    NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXTAUTH_URL
  },

  // Security headers (optional but recommended)
  async rewrites() {
    return [
      {
        source: '/.well-known/lnurlp/:path*',
        destination: `${process.env.BTCPAY_URL}/.well-known/lnurlp/:path*`
      }
    ]
  }
}

export default nextConfig