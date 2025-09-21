import { DataTable } from "./DataTable";

export const ResultsDisplay = ({ filteredResults, searchTerm }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col flex-1">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-lg font-semibold text-gray-900">
        Search Results
        {searchTerm && ` for "${searchTerm}"`}
      </h3>
      <div className="text-sm text-gray-600">
        {filteredResults.length} table{filteredResults.length !== 1 ? 's' : ''} with results
      </div>
    </div>

    <div className="flex-1 overflow-y-auto">
      {filteredResults.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No Results Found' : 'Ready to Search'}
          </h4>
          <p className="text-gray-600">
            {searchTerm
              ? `No records match "${searchTerm}" in the selected tables`
              : 'Enter a search term or select tables to begin searching'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredResults.map(result =>
            <DataTable
              key={result.tableName}
              tableName={result.tableName}
              data={result.data}
              config={result.config}
              searchTerm={searchTerm}
            />
          )}
        </div>
      )}
    </div>
  </div>
);
