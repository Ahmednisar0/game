'use client';

import { useSearchParams } from "next/navigation";
import { useGameStore } from "../contexts/GameStoreContext";
import { useEffect, useState } from "react";
import type { FormData, CartItem } from "@/types/order";
import { client } from "@/sanity/lib/client";
import { FiCheck, FiHome } from "react-icons/fi";

export default function PaymentSuccess() {
  const params = useSearchParams();
  const amount = params.get('amount') || "0";
  const [purchasedItems, setPurchasedItems] = useState<CartItem[]>([]);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const { getFormattedPrice } = useGameStore();

  useEffect(() => {
    setOrderNumber(Math.floor(100000 + Math.random() * 900000).toString());
  }, []);

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

  useEffect(() => {
    if (purchasedItems.length === 0 || !orderNumber) return;

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
  }, [purchasedItems, orderNumber]);

  const processOrder = async () => {
    const formData = getFormDataFromParams();

    const orderData = {
      _type: "order",
      ...formData,
      orderNumber,
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

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-500 to-pink-700 p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 bg-white rounded-full mb-4">
            <FiCheck className="h-8 w-8 text-pink-900" />
          </div>
          <h1 className="text-2xl font-bold text-white">Payment Successful</h1>
          <p className="text-blue-100 mt-1">Thank you for your purchase</p>
        </div>

        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-pink-800">Order Summary</h2>
            {orderNumber && (
              <span className="text-sm text-gray-500">#{orderNumber}</span>
            )}
          </div>

          <div className="space-y-4">
            {purchasedItems.map((item) => (
              <div key={item.product.id} className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
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
        </div>

        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Amount</span>
            <span className="text-xl font-bold text-gray-900">${amount}</span>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">What happens next?</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">
                <FiCheck />
              </div>
              <span className="ml-2 text-sm text-gray-600">
                Your order has been confirmed
              </span>
            </li>
            <li className="flex items-start">
              <div className="flex-shrink-0 h-5 w-5 text-blue-500 mt-0.5">
                <FiCheck />
              </div>
              <span className="ml-2 text-sm text-gray-600">
                Your order is being processed
              </span>
            </li>
          </ul>

          <div className="mt-8">
            <a
              href="/"
              className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <FiHome className="mr-2" />
              Back to Home
            </a>
          </div>
        </div>
      </div>

      {purchasedItems.length > 0 && (
        <div className="mt-6 flex items-center text-sm text-gray-500">
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Securing your order...
        </div>
      )}
    </main>
  );
}
