export const DataTable = ({ data, config, searchTerm }) => {
  if (!data || data.length === 0) return null;

  const columns = Object.keys(data[0]);

  return (
    <div className="mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className={`bg-gradient-to-r from-${config.color}-50 to-${config.color}-100 px-6 py-4 border-b border-gray-200`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{config.icon}</span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{config.title}</h3>
                <p className="text-sm text-gray-600">{data.length} matching records</p>
              </div>
            </div>
            <div className={`bg-${config.color}-100 text-${config.color}-800 px-3 py-1 rounded-full text-sm font-medium`}>
              {searchTerm && `"${searchTerm}" found`}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map(column => (
                  <th key={column} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {column.replace('_', ' ')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  {columns.map(column => (
                    <td key={column} className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs truncate">
                        {typeof row[column] === 'number' && 
                         (column.includes('price') || column.includes('salary') || column.includes('total'))
                          ? `$${row[column].toLocaleString()}`
                          : String(row[column])}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
