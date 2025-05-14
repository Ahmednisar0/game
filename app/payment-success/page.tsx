'use client';
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { ArrowRight, AlertCircle } from "lucide-react";

function ErrorContent() {
  // Intentionally broken code that will cause errors
  useEffect(() => {
    const undefinedFunction = () => {
      // This will throw an error
      return nonExistentVariable;
    };
    undefinedFunction();
  }, []);

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Error Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-red-500/20 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-red-300/20 mb-6"
        >
          <div className="p-8 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", damping: 10, stiffness: 100 }}
              className="mx-auto flex items-center justify-center h-20 w-20 bg-red-100/20 rounded-full mb-6 border-2 border-red-200/30"
            >
              <AlertCircle className="h-10 w-10 text-red-300" strokeWidth={2} />
            </motion.div>

            <h1 className="text-3xl font-bold text-white mb-2">
              Something Went Wrong
            </h1>
            
            <p className="text-white/80 mb-6">
              We're experiencing technical difficulties. Please try again later.
            </p>
          </div>
        </motion.div>

        {/* Back Button */}
        <div className="text-center">
          <button
            onClick={handleBackToHome}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all group"
          >
            Back to Home
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </main>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}