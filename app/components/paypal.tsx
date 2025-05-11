"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { FC, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface PayPalButtonProps {
  amount: string;
}

const PayPalButton: FC<PayPalButtonProps> = ({ amount }) => {
  const hasPayPalClientId = !!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-6 border-t pt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex justify-between items-center text-lg font-semibold mb-4 text-gray-800 hover:text-gray-900 focus:outline-none"
      >
        <div className="flex items-center">
          {/* PayPal Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-blue-500"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
          </svg>
          <span>Pay with PayPal</span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5" />
        ) : (
          <ChevronDown className="h-5 w-5" />
        )}
      </button>

      {isExpanded && (
        <div className="transition-all duration-300 ease-in-out">
          {hasPayPalClientId ? (
            <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
              <PayPalButtons
                style={{ layout: "vertical", color: "blue", shape: "pill", label: "paypal" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: amount,
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order?.capture();
                  alert(`Demo: Payment by ${details?.payer?.name?.given_name || "User"}`);
                }}
              />
            </PayPalScriptProvider>
          ) : (
            <div className="border rounded-lg p-6 bg-gray-50">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-700">PayPal Payment</h3>
                <p className="text-sm text-gray-500 text-center">
                  {amount} USD will be charged to your PayPal account
                </p>
                <button
                  disabled
                  className="w-full max-w-xs bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed with PayPal
                </button>
                <p className="text-xs text-gray-400 text-center">
                  PayPal integration will appear here when configured
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PayPalButton;