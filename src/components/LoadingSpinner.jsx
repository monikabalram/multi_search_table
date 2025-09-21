export const LoadingSpinner = () => (
  <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-lg text-gray-600">Loading CSV files...</p>
    </div>
  </div>
);