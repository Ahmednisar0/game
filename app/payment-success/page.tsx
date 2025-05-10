'use client';
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useGameStore } from "../contexts/GameStoreContext";
import { useEffect, useState, Suspense } from "react";
import type { FormData, CartItem } from "@/types/order";
import { client } from "@/sanity/lib/client";
import { ArrowRight, CheckCircle, Clock, Mail, ShoppingBag } from "lucide-react";

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

  // Wait for purchasedItems to be set, then process order
  useEffect(() => {
    if (purchasedItems.length === 0) return;

    const formData = getFormDataFromParams();
    const orderKey = `order_${formData.email}_${amount}`;
    const hasRun = localStorage.getItem(orderKey);

    if (!hasRun) {
      const timer = setTimeout(() => {
        processOrder();
        console.log('Order processed once for:', orderKey);
        localStorage.setItem(orderKey, 'true');
        localStorage.removeItem("purchasedItems");
      }, 3000); // 3-second delay

      return () => clearTimeout(timer);
    }
  }, [purchasedItems]); // Runs only when purchasedItems are set

  const processOrder = async () => {
    const formData = getFormDataFromParams();

    const formdata = {
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
      const result = await client.create(formdata);
      console.log('Document created:', result);
    } catch (err) {
      console.error('Error pushing data:', err);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 space-y-6">
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

            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Payment Successful!
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/80 mb-6"
            >
              Thank you for your purchase. Your order has been confirmed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white/20 rounded-xl p-6 mb-8"
            >
              <p className="text-white/80 text-sm mb-1">Amount Paid</p>
              <p className="text-4xl font-bold text-white">
                {getFormattedPrice(parseFloat(amount || '0'))}
              </p>
            </motion.div>
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
            
              <div className="space-y-4">
                {purchasedItems.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
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
                  </motion.div>
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
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex items-start p-3 bg-white/5 rounded-lg"
              >
                <Mail className="h-5 w-5 text-blue-300 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-white">Receipt sent to your email</p>
                  <p className="text-xs text-white/60">Check your inbox for order confirmation</p>
                </div>
              </motion.div>
              
              
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <a 
            href="/" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-white/20 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-all group"
          >
            Continue Shopping
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.8); opacity: 0; }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes popIn {
          0% { transform: scale(0.9); opacity: 0; }
          80% { transform: scale(1.03); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.5s ease-out forwards;
        }
        .animate-pop-in {
          animation: popIn 0.5s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
      `}</style>
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