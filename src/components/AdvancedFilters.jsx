import { ChevronDown, ChevronUp, Filter } from "lucide-react";
import { tableConfigs } from "../constants/fileData";

export const AdvancedFilters = ({
  showAdvancedFilters,
  setShowAdvancedFilters,
  selectedTables,
  filters,
  handleFilterChange,
  data,
}) => {
  const getFilterableFields = (tableName) => {
    // Check for pre-defined filter fields first
    if (tableConfigs[tableName]?.filterFields) {
      return Object.entries(tableConfigs[tableName].filterFields);
    }
    if (data[tableName]) {
      // Fallback to inferring from data, but add a check
      const tableData = data[tableName];

      // Make sure tableData is defined, an array, and not empty before proceeding
      if (tableData && Array.isArray(tableData) && tableData.length > 0) {
        const firstRow = tableData[0];
        return Object.keys(firstRow)
          .map((field) => {
            // Infer type: if all values are numbers, it's a range filter
            const isNumeric = tableData.every(
              (row) => !isNaN(Number(row[field]))
            );

            return [
              field,
              {
                type: isNumeric ? "range" : "select",
                values: isNumeric
                  ? null
                  : [...new Set(tableData.map((row) => row[field]))],
                min: isNumeric
                  ? Math.min(...tableData.map((row) => Number(row[field])))
                  : null,
                max: isNumeric
                  ? Math.max(...tableData.map((row) => Number(row[field])))
                  : null,
              },
            ];
          })
          .filter(
            ([config]) =>
              (config.type === "select" &&
                config.values.length > 1 &&
                config.values.length < 20) ||
              (config.type === "range" &&
                config.min !== Infinity &&
                config.max !== -Infinity &&
                config.max !== config.min)
          );
      }
    }
    return [];
  };

  const renderFilters = (tableName) => {
    const filterFields = getFilterableFields(tableName);
    if (filterFields.length === 0) return null;

    const config = tableConfigs[tableName] || { title: tableName, icon: "📄" };

    return (
      <div className="space-y-3">
        <h5 className="font-medium text-gray-800 flex items-center text-sm">
          <span className="mr-2">{config.icon}</span>
          {config.title}
        </h5>
        <div className="space-y-3 pl-6">
          {filterFields.map(([field, fieldConfig]) => (
            <div key={field}>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                {field
                  .replace("_", " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </label>

              {fieldConfig.type === "select" ? (
                <select
                  value={filters[tableName]?.[field] || ""}
                  onChange={(e) =>
                    handleFilterChange(tableName, field, e.target.value || null)
                  }
                  className="w-full text-sm rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">All</option>
                  {fieldConfig.values.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="flex space-x-1">
                  <input
                    type="number"
                    placeholder="Min"
                    min={fieldConfig.min}
                    max={fieldConfig.max}
                    step={fieldConfig.step || 1}
                    value={filters[tableName]?.[field]?.[0] || ""}
                    onChange={(e) => {
                      const min = Number(e.target.value) || "";
                      const max = filters[tableName]?.[field]?.[1] || "";
                      handleFilterChange(tableName, field, [min, max]);
                    }}
                    className="flex-1 text-sm rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    min={fieldConfig.min}
                    max={fieldConfig.max}
                    step={fieldConfig.step || 1}
                    value={filters[tableName]?.[field]?.[1] || ""}
                    onChange={(e) => {
                      const min = filters[tableName]?.[field]?.[0] || "";
                      const max = Number(e.target.value) || "";
                      handleFilterChange(tableName, field, [min, max]);
                    }}
                    className="flex-1 text-sm rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <button
        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <span className="font-medium text-gray-700 flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Advanced Filters
        </span>
        {showAdvancedFilters ? (
          <ChevronUp size={16} />
        ) : (
          <ChevronDown size={16} />
        )}
      </button>

      {showAdvancedFilters && (
        <div className="mt-4 space-y-4 max-h-96 overflow-y-auto">
          {selectedTables.map((tableName) => (
            <div key={tableName} className="p-4 bg-gray-50 rounded-lg">
              {renderFilters(tableName)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
