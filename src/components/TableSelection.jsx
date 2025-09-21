import { Database, Eye, EyeOff, Trash2, X } from "lucide-react";
import { tableConfigs } from "../constants/fileData";

export const TableSelection = ({ 
  selectedTables, 
  handleTableToggle, 
  data, 
  uploadedTables, 
  removeUploadedTable, 
  onClearAll 
}) => {
  // Combine static and uploaded tables for a comprehensive list
  const allTables = { ...tableConfigs, ...uploadedTables };
  const allTableNames = Object.keys(allTables);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Database className="mr-2 h-5 w-5" />
          Tables Being Searched
        </h3>
        <button
          onClick={onClearAll}
          className="text-sm text-red-600 hover:text-red-800 flex items-center"
        >
          <X size={14} className="mr-1" />
          Clear All
        </button>
      </div>
      
      <div className="space-y-3">
        {allTableNames.map((tableName) => {
          const isUploaded = uploadedTables[tableName];
          const config = tableConfigs[tableName] || { title: tableName, icon: '📄' }; // Fallback for uploaded tables

          return (
            <div key={tableName} className={`flex items-center justify-between p-3 border rounded-lg ${
              isUploaded 
                ? 'border-green-200 bg-green-50' 
                : 'border-gray-200'
            }`}>
              <div className="flex items-center space-x-3">
                <span className="text-xl">{config.icon}</span>
                <div>
                  <div className="font-medium text-gray-900 flex items-center">
                    {config.title}
                    {isUploaded && (
                      <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                        Uploaded
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {data[tableName]?.length || 0} total records
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {isUploaded && (
                  <button
                    onClick={() => removeUploadedTable(tableName)}
                    className="p-1 text-red-600 hover:text-red-800"
                    title="Remove uploaded table"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                <button
                  onClick={() => handleTableToggle(tableName)}
                  className={`p-2 rounded-lg transition-all ${
                    selectedTables.includes(tableName)
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {selectedTables.includes(tableName) ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};