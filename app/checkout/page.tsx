"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/checkoutform";
import { useGameStore } from "../contexts/GameStoreContext";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import PayPalButton from "../components/paypal";
import { PayButton } from "../components/btcpay";

// Initialize Stripe
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY 
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  : null;

// Payment Logos Components
const StripeLogo = () => (
  <svg viewBox="0 0 28 28" className="h-6 w-auto">
    <path fill="#6772e5" d="M13.72 12.375c0-.345.31-.483.825-.483.793 0 2.897.093 4.226.483 1.104.345 1.518.724 1.518 1.242 0 .552-.414.966-1.518 1.311-1.329.414-3.433.552-4.226.552-.515 0-.825-.138-.825-.483v-2.622zm-4.552-.69c0 .759.621 1.311 1.656 1.311h3.174v-1.035H10.81c-.345 0-.586-.138-.586-.345 0-.207.241-.345.586-.345h1.587c1.242 0 2.069-.552 2.069-1.449 0-.828-.69-1.311-1.863-1.311h-3.31v6.9h1.242v-2.726h1.587l1.449 2.726h1.449l-1.587-2.898c.966-.276 1.587-1.035 1.587-1.933 0-1.311-1.104-2.208-2.897-2.208h-4.14v6.9h1.242v-2.622z"/>
  </svg>
);

const VisaMcLogo = () => (
  <svg viewBox="0 0 52 32" className="h-6 w-auto">
    <path fill="#1a1f71" d="M23.4 10.2h-4.8l-3.6 11.5h4.8l3.6-11.5z"/>
    <path fill="#f79e1b" d="M35.4 10.2h-4.2l-2.4 11.5h4.2l2.4-11.5z"/>
  </svg>
);

const PayPalLogo = () => (
  <svg viewBox="0 0 32 32" className="h-6 w-auto">
    <path fill="#253b80" d="M6 10v13h3.6l.8-3.6.4-1.6h3.2c3.2 0 5.6-1.2 6.4-4.4.4-1.6.4-3.2 0-4.4C19.6 7.6 16.8 6 13.2 6H6z"/>
    <path fill="#179bd7" d="M25.8 10.8c-.8 3.2-3.2 4.4-6.4 4.4h-3.2l-.8 3.6-.4 1.6H19l2.4-11.6H26c.4 0 .8.4.8.8v.8z"/>
    <path fill="#222d65" d="M9.4 10l-.8 3.2-.4 1.6h4.8c3.2 0 5.6-1.2 6.4-4.4.4-1.6.4-3.2 0-4.4-.4-.8-1.2-1.2-2-1.6H9.4z"/>
  </svg>
);

const BitcoinLogo = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-auto">
    <path fill="#F7931A" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"/>
    <path fill="white" d="M16.8413 10.5276C16.9366 10.1467 16.6688 9.77805 16.279 9.72768L14.3473 9.48438L15.1009 6.19043C15.1476 5.96484 15.0405 5.73926 14.8335 5.63281L13.0586 4.6875C12.8789 4.59492 12.6533 4.62891 12.5068 4.77539L6.56348 10.718C6.45605 10.8254 6.41602 10.9799 6.45605 11.1211L7.53516 15.7266L5.60352 15.4834C5.21367 15.4331 4.89961 15.7406 4.96875 16.1215L6.28125 22.7812C6.31758 22.9664 6.47051 23.1047 6.65576 23.1047H8.9209C9.12451 23.1047 9.29004 22.9528 9.30352 22.749L9.52734 20.4844L12.2812 20.8594L12.0574 23.124C12.0439 23.3276 12.2095 23.4795 12.4131 23.4795H14.6782C14.8635 23.4795 15.0164 23.3411 15.0527 23.1562L16.8413 10.5276ZM13.3242 17.0625L10.5703 16.6875L10.1602 19.125L12.9141 19.5L13.3242 17.0625ZM14.0273 13.5L13.6172 15.9375L10.8633 15.5625L11.2734 13.125L14.0273 13.5ZM14.7305 9.9375L14.3203 12.375L11.5664 12L11.9766 9.5625L14.7305 9.9375Z"/>
  </svg>
);

export default function CheckoutPage() {
  const { getCartTotal, getFormattedPrice, cartItems } = useGameStore();
  const amount = getCartTotal();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  // Store cart items before processing payment
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("purchasedItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Prepare cart items data for PayButton
  const formattedCartItems = cartItems.map(item => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
    image: item.product.image
  }));

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <ShoppingBag className="mx-auto h-16 w-16 text-pink-500" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
          <p className="mt-2 text-pink-600">Secure checkout with multiple payment options</p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Order Summary */}
          <div className="p-6 border-b border-pink-100 bg-pink-50">
            <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
            <div className="mt-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between">
                  <div className="flex items-center">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="h-12 w-12 rounded-md object-cover mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {getFormattedPrice(item.product.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-pink-100">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total</p>
                <p className="text-pink-600">{getFormattedPrice(amount)}</p>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h2>
            
            <div className="space-y-4">
              {/* Credit Card Option */}
              {stripePromise && (
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedPayment === 'stripe' ? 'border-pink-500 bg-pink-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedPayment('stripe')}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      checked={selectedPayment === 'stripe'}
                      onChange={() => {}}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                    />
                    <label className="ml-3 block text-sm font-medium text-gray-700">
                      Credit/Debit Card
                    </label>
                    <div className="ml-auto flex space-x-2">
                      <StripeLogo />
                      <VisaMcLogo />
                    </div>
                  </div>
                  {selectedPayment === 'stripe' && (
                    <div className="mt-4">
                      <Elements
                        stripe={stripePromise}
                        options={{
                          mode: "payment",
                          amount: convertToSubcurrency(amount),
                          currency: "usd",
                        }}
                      >
                        <CheckoutForm amount={amount} />
                      </Elements>
                    </div>
                  )}
                </div>
              )}

              {/* PayPal Option */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedPayment === 'paypal' ? 'border-pink-500 bg-pink-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedPayment('paypal')}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    checked={selectedPayment === 'paypal'}
                    onChange={() => {}}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    PayPal
                  </label>
                  <div className="ml-auto">
                    <PayPalLogo />
                  </div>
                </div>
                {selectedPayment === 'paypal' && (
                  <div className="mt-4">
                    <PayPalButton amount={amount.toFixed(2)} />
                  </div>
                )}
              </div>

              {/* Bitcoin Option */}
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedPayment === 'btc' ? 'border-pink-500 bg-pink-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedPayment('btc')}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    checked={selectedPayment === 'btc'}
                    onChange={() => {}}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Bitcoin
                  </label>
                  <div className="ml-auto">
                    <BitcoinLogo />
                  </div>
                </div>
                {selectedPayment === 'btc' && (
                  <div className="mt-4">
                    <PayButton 
                      amount={amount} 
                      cartItems={formattedCartItems}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your transaction is secure and encrypted. By completing your purchase, you agree to our Terms of Service.</p>
        </div>
      </div>
    </main>
  );
}