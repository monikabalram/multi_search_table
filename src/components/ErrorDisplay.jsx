export const ErrorDisplay = ({ error, onRetry }) => (
  <div className="max-w-7xl mx-auto px-6 py-12">
    <div className="text-center">
      <div className="text-red-500 text-6xl mb-4">⚠️</div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Data</h3>
      <p className="text-red-600 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Retry Loading
      </button>
    </div>
  </div>
);