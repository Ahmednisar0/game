'use client';

export default function ErrorPage() {
  const handleRefresh = () => {
    window.location.reload(); // This will refresh the page
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}