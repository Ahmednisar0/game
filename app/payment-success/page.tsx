'use client';

import { useSearchParams } from "next/navigation";
import { useGameStore } from "../contexts/GameStoreContext";
import { useEffect, useState } from "react";
import type { FormData, CartItem } from "@/types/order";
import { client } from "@/sanity/lib/client";

export default function PaymentSuccess({
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
      {purchasedItems.map((item) => (
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

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl overflow-hidden border border-white/20 animate-fade-in">
        <div className="p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 bg-green-100 rounded-full mb-6 animate-bounce-in">
            <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2 animate-slide-up">Payment Successful!</h1>
          <p className="text-white/80 mb-6 animate-slide-up delay-100">Thank you for your purchase</p>

          <div className="bg-white/20 rounded-xl p-6 mb-8 animate-pop-in">
            <p className="text-white/80 text-sm mb-1">Amount Paid</p>
            <p className="text-4xl font-bold text-white">${amount}</p>
          </div>

          <div className="bg-white/10 rounded-lg p-4 mb-8 text-left animate-fade-in delay-200">
            <h3 className="font-medium text-white mb-2">What's next?</h3>
            <ul className="text-sm text-white/80 space-y-1">
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                Receipt sent to your email
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
                Order processing started
              </li>
            </ul>
          </div>

          <div className="animate-fade-in delay-300">
            <a href="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-white/20 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-all">
              Back to Home
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

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
