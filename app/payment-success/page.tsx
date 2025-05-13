'use client';
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useGameStore } from "../contexts/GameStoreContext";
import { useEffect, useState, Suspense } from "react";
import type { FormData, CartItem } from "@/types/order";
import { client } from "@/sanity/lib/client";
import { ArrowRight, CheckCircle, Mail } from "lucide-react";

function PaymentSuccessContent({
  searchParams,
}: {
  searchParams: { amount: string };
}) {
  const params = useSearchParams();
  const amount = params.get('amount') || searchParams.amount;
  const [purchasedItems, setPurchasedItems] = useState<CartItem[]>([]);
  const { getFormattedPrice } = useGameStore();

  const getFormDataFromParams = (): FormData => ({
    firstName: params.get('firstName') || '',
    lastName: params.get('lastName') || '',
    email: params.get('email') || '',
    phone: params.get('phone') || '',
    address: params.get('address') || '',
    apartment: params.get('apartment') || '',
    city: params.get('city') || '',
    state: params.get('state') || '',
    zipCode: params.get('zipCode') || '',
    country: params.get('country') || 'US',
  });

  // Load purchased items from localStorage
  useEffect(() => {
    const storedItems = localStorage.getItem("purchasedItems");
    if (storedItems) {
      try {
        const parsed: CartItem[] = JSON.parse(storedItems);
        setPurchasedItems(parsed);
      } catch (error) {
        console.error("Invalid purchasedItems data in localStorage:", error);
      }
    }
  }, []);

  // Process order when purchasedItems are loaded
  useEffect(() => {
    if (purchasedItems.length === 0) return;

    const formData = getFormDataFromParams();
    const orderKey = `order_${formData.email}_${amount}`;
    const hasRun = localStorage.getItem(orderKey);

    if (!hasRun) {
      const timer = setTimeout(() => {
        processOrder();
        localStorage.setItem(orderKey, 'true');
        localStorage.removeItem("purchasedItems");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [purchasedItems]);

  const processOrder = async () => {
    const formData = getFormDataFromParams();

    const orderData = {
      _type: "order",
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      apartment: formData.apartment,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      zipCode: formData.zipCode,
      products: purchasedItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        category: item.product.category,
      })),
    };

    try {
      await client.create(orderData);
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };

  const handleContinueShopping = () => {
    // Clear cart from localStorage
    localStorage.removeItem("cart");
    // Force full page reload to reset all states
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Success Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20 mb-6"
        >
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
              className="mx-auto flex items-center justify-center h-20 w-20 bg-green-100/20 rounded-full mb-6 border-2 border-green-200/30"
            >
              <CheckCircle className="h-10 w-10 text-green-300" strokeWidth={2} />
            </motion.div>

            <h1 className="text-3xl font-bold text-white mb-2">
              Payment Successful!
            </h1>
            
            <p className="text-white/80 mb-6">
              Thank you for your purchase. Your order has been confirmed.
            </p>

            <div className="bg-white/20 rounded-xl p-6 mb-8">
              <p className="text-white/80 text-sm mb-1">Amount Paid</p>
              <p className="text-4xl font-bold text-white">
                {getFormattedPrice(parseFloat(amount || '0'))}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Order Summary */}
        {purchasedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/20 mb-6"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
              <div className="space-y-4">
                {purchasedItems.map((item, index) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-14 w-14 rounded-md object-cover mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-white">{item.product.name}</p>
                        <p className="text-xs text-white/60">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-white">
                      {getFormattedPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/20 mb-6"
        >
          <div className="p-6">
            <h2 className="text-xl font-semibold text-white mb-4">What's Next?</h2>
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-white/5 rounded-lg">
                <Mail className="h-5 w-5 text-blue-300 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Your order has been confirmed</p>
                  <p className="text-xs text-white/60">A confirmation email has been sent</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Continue Shopping Button */}
        <div className="text-center">
          <button
            onClick={handleContinueShopping}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-white/20 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-all group"
          >
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </main>
  );
}

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { amount: string };
}) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentSuccessContent searchParams={searchParams} />
    </Suspense>
  );
}