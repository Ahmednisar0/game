'use client';

const ErrorPage = () => {
  const handleRefresh = () => {
    // Clear cart items from localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
      // Alternative if you store cart differently:
      // localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Clear session data if needed
    sessionStorage.removeItem('cartTempData');
    
    // Force full page refresh
    window.location.href = window.location.origin + window.location.pathname;
    // OR simply:
    // window.location.reload(true); // The true forces a hard refresh
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-medium text-gray-900 mb-2">Cart Error</h1>
        <p className="text-gray-600 mb-6">
          We encountered an issue with your cart. Refresh to start fresh.
        </p>
        
        <button
          onClick={handleRefresh}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Clear Cart & Refresh
        </button>
        
        <p className="mt-4 text-xs text-gray-500">
          All items will be removed
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;