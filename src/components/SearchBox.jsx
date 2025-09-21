import { Search } from "lucide-react";

export const SearchBox = ({ searchTerm, setSearchTerm }) => (
  <div className="bg-white rounded-lg shadow-sm p-6">
    <div className="relative">
      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search across selected tables..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
    {searchTerm && (
      <div className="mt-3 p-2 bg-blue-50 rounded text-sm text-blue-700">
        Searching for: <strong>"{searchTerm}"</strong>
      </div>
    )}
  </div>
);