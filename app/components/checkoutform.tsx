"use client";
import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import { useGameStore } from "../contexts/GameStoreContext";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Loader2 } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { CartItem } from "@/types/order";

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IT", name: "Italy" },
  { code: "JP", name: "Japan" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
  { code: "CN", name: "China" },
  { code: "RU", name: "Russia" },
  { code: "KR", name: "South Korea" },
  { code: "ES", name: "Spain" },
  { code: "MX", name: "Mexico" },
  { code: "ID", name: "Indonesia" },
  { code: "NL", name: "Netherlands" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "TR", name: "Turkey" },
  { code: "CH", name: "Switzerland" },
  { code: "AR", name: "Argentina" },
  { code: "SE", name: "Sweden" },
  { code: "PL", name: "Poland" },
  { code: "BE", name: "Belgium" },
  { code: "TH", name: "Thailand" },
  { code: "IR", name: "Iran" },
  { code: "AT", name: "Austria" },
  { code: "NO", name: "Norway" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "NG", name: "Nigeria" },
  { code: "IL", name: "Israel" },
  { code: "ZA", name: "South Africa" },
  { code: "IE", name: "Ireland" },
  { code: "DK", name: "Denmark" },
  { code: "SG", name: "Singapore" },
  { code: "MY", name: "Malaysia" },
  { code: "PH", name: "Philippines" },
  { code: "EG", name: "Egypt" },
  { code: "FI", name: "Finland" },
  { code: "CO", name: "Colombia" },
  { code: "PK", name: "Pakistan" },
  { code: "CL", name: "Chile" },
  { code: "BD", name: "Bangladesh" },
  { code: "VN", name: "Vietnam" },
  { code: "PT", name: "Portugal" },
  { code: "CZ", name: "Czech Republic" },
  { code: "RO", name: "Romania" },
  { code: "PE", name: "Peru" },
  { code: "NZ", name: "New Zealand" },
  { code: "IQ", name: "Iraq" },
  { code: "GR", name: "Greece" },
  { code: "QA", name: "Qatar" },
  { code: "DZ", name: "Algeria" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "HU", name: "Hungary" },
  { code: "UA", name: "Ukraine" },
  { code: "KW", name: "Kuwait" },
  { code: "MA", name: "Morocco" },
  { code: "SK", name: "Slovakia" },
  { code: "AO", name: "Angola" },
  { code: "EC", name: "Ecuador" },
  { code: "LK", name: "Sri Lanka" },
  { code: "ET", name: "Ethiopia" },
  { code: "OM", name: "Oman" },
  { code: "PR", name: "Puerto Rico" },
  { code: "BY", name: "Belarus" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "SD", name: "Sudan" },
  { code: "DO", name: "Dominican Republic" },
  { code: "KE", name: "Kenya" },
  { code: "BG", name: "Bulgaria" },
  { code: "VE", name: "Venezuela" },
  { code: "RS", name: "Serbia" },
  { code: "TN", name: "Tunisia" },
  { code: "GH", name: "Ghana" },
  { code: "LB", name: "Lebanon" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "CR", name: "Costa Rica" },
  { code: "PS", name: "Palestine" },
  { code: "HR", name: "Croatia" },
  { code: "LT", name: "Lithuania" },
  { code: "SI", name: "Slovenia" },
  { code: "JO", name: "Jordan" },
  { code: "PY", name: "Paraguay" },
  { code: "LV", name: "Latvia" },
  { code: "UG", name: "Uganda" },
  { code: "SV", name: "El Salvador" },
  { code: "LK", name: "Sri Lanka" },
  { code: "GT", name: "Guatemala" },
  { code: "CY", name: "Cyprus" },
  { code: "NP", name: "Nepal" },
  { code: "UY", name: "Uruguay" },
  { code: "EE", name: "Estonia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "GE", name: "Georgia" },
  { code: "CM", name: "Cameroon" },
  { code: "CI", name: "Ivory Coast" },
  { code: "SN", name: "Senegal" },
  { code: "ZW", name: "Zimbabwe" },
  { code: "KH", name: "Cambodia" },
  { code: "IS", name: "Iceland" },
  { code: "NI", name: "Nicaragua" },
  { code: "MK", name: "North Macedonia" },
  { code: "MT", name: "Malta" },
  { code: "BW", name: "Botswana" },
  { code: "AL", name: "Albania" },
  { code: "ME", name: "Montenegro" }
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  id: string;
          name: string;
          price: string;
          quantity: string;
          category: string
}

const CheckoutForm = ({ amount }: { amount: number }): React.JSX.Element => {
  const [purchasedItems, setPurchasedItems] = useState<CartItem[]>([]);
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { getFormattedPrice } = useGameStore();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    country: "US",
    state: "",
    zipCode: "",
     id: "",
     name: "",
          price: "",
          quantity: "",
          category: "",
  });
purchasedItems.map(item => ({
        id : item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        category: item.product.category,
      }))
      
       const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        setLoading(false);
        return;
      }

      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount: convertToSubcurrency(amount),
          customer: formData,
        }),
      });

      if (!res.ok) throw new Error("Failed to create payment intent");

      const { clientSecret } = await res.json();

      const params = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) params.set(key, value);
      });

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success?amount=${amount}&${params.toString()}`,
          receipt_email: formData.email,
        },
      });

      if (error) throw error;
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Payment failed");
      setLoading(false);
    }
  };

  if (!stripe || !elements) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
      </div>
    );
  }

  return (
   <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-2xl mx-auto text-black ">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Shipping Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-3 border text-black  border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 border text-black  border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border text-black  border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border text-black  border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Street Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border text-black  border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
            Apartment, Suite, etc. (Optional)
          </label>
          <input
            type="text"
            id="apartment"
            name="apartment"
            value={formData.apartment}
            onChange={handleChange}
            className="w-full p-3 border text-black  border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
        
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
            Country *
          </label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-3 border text-black  border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            required
          >
            {COUNTRIES.map(country => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
            State/Province *
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-3 border text-black  border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-3 border text-black  border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
            ZIP/Postal Code *
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full p-3 border text-black  border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            required
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
      <div className="mb-8">
        <PaymentElement 
          options={{
            layout: "tabs",
            fields: {
              billingDetails: {
                address: {
                  country: 'auto'
                }
              }
            }
          }}
          className="border text-black  border-gray-300 rounded-lg p-4"
        />
      </div>

      {errorMessage && (
        <div className="text-red-500 mb-6 p-4 bg-red-50 rounded-lg">
          {errorMessage}
        </div>
      )}

      <button
        disabled={!stripe || loading}
        className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Processing Payment...
          </>
        ) : (
          `Pay ${getFormattedPrice(amount)}`
        )}
      </button>

      <div className="mt-6 text-sm text-gray-500">
        <p>Your payment is secure and encrypted. By completing your purchase, you agree to our Terms of Service.</p>
      </div>
    </form>
  );
};

export default CheckoutForm;