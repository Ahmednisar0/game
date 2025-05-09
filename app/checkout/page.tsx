"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/checkoutform";
import { useGameStore } from "../contexts/GameStoreContext";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { ShoppingBag } from "lucide-react";

// Initialize Stripe
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CheckoutPage() {
  const { getCartTotal, getFormattedPrice, cartItems } = useGameStore();
  const amount = getCartTotal();

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <ShoppingBag className="mx-auto h-16 w-16 text-pink-500" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Complete Your Purchase</h1>
          <p className="mt-2 text-pink-600">Secure checkout powered by Stripe</p>
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

          {/* Payment Form */}
          <div className="p-6">
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
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Your transaction is secure and encrypted. By completing your purchase, you agree to our Terms of Service.</p>
        </div>
      </div>
    </main>
  );
}