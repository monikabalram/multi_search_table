import { useEffect, useMemo, useState } from "react";
import { csvFiles, tableConfigs } from "./constants/fileData";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { SearchBox } from "./components/SearchBox";
import { TableSelection } from "./components/TableSelection";
import { AdvancedFilters } from "./components/AdvancedFilters";
import { CSVUpload } from "./components/CSVUpload";
import { ResultsDisplay } from "./components/ResultsDisplay";
import Papa from "papaparse";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [selectedTables, setSelectedTables] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [uploadedTables, setUploadedTables] = useState({});
  const [showUpload, setShowUpload] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState("");

  // Load CSV files on component mount
  useEffect(() => {
    loadCSVFiles();
  }, []);

  const loadCSVFiles = async () => {
    setLoading(true);
    setLoadingError("");
    try {
      const loadPromises = csvFiles.map(({ name, file }) => {
        return fetch(`/${file}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to load ${file}`);
            }
            return response.text();
          })
          .then((csvText) => {
            return new Promise((resolve) => {
              Papa.parse(csvText, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: (results) => {
                  const parsedData = results.data;
                  const filteredData = parsedData.filter((row) =>
                    Object.values(row).some(
                      (value) => value !== null && value !== ""
                    )
                  );
                  resolve({ name, data: filteredData });
                },
              });
            });
          });
      });
      const results = await Promise.all(loadPromises);
      const loadedData = {};
      results.forEach(({ name, data }) => {
        loadedData[name] = data;
      });
      setData(loadedData);
      setSelectedTables(Object.keys(loadedData));
    } catch (error) {
      console.error("Error loading CSV files:", error);
      setLoadingError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (files) => {
    if (!files) return;
    const fileArray = Array.from(files);
    fileArray.forEach((file) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          const tableName = file.name.replace(".csv", "");
          const parsedData = results.data;

          // Filter out rows that are completely empty
          const filteredData = parsedData.filter((row) =>
            Object.values(row).some((value) => value !== null && value !== "")
          );

          // Correctly update the data and uploadedTables states
          setData((prevData) => ({ ...prevData, [tableName]: filteredData }));
          setSelectedTables((prevTables) => [
            ...new Set([...prevTables, tableName]),
          ]);
          setUploadedTables((prevUploaded) => ({
            ...prevUploaded,
            [tableName]: file.name,
          }));
        },
      });
    });
  };

  const removeUploadedTable = (tableName) => {
    setData((prevData) => {
      const newData = { ...prevData };
      delete newData[tableName];
      return newData;
    });
    setSelectedTables((prevTables) =>
      prevTables.filter((name) => name !== tableName)
    );
    setUploadedTables((prevUploaded) => {
      const newUploaded = { ...prevUploaded };
      delete newUploaded[tableName];
      return newUploaded;
    });
  };

  const handleTableToggle = (tableName) => {
    setSelectedTables((prev) =>
      prev.includes(tableName)
        ? prev.filter((name) => name !== tableName)
        : [...prev, tableName]
    );
  };

  const handleFilterChange = (tableName, field, value) => {
    const parsedValue = Array.isArray(value)
      ? value.map((v) => (v === "" ? null : parseFloat(v)))
      : value;

    setFilters((prev) => ({
      ...prev,
      [tableName]: {
        ...prev[tableName],
        [field]: parsedValue,
      },
    }));
  };

  const onClearAll = () => {
    setSelectedTables([]);
    setSearchTerm("");
    setFilters({});
  };
const filteredResults = useMemo(() => {
    const results = [];

    for (const tableName in data) {
      if (!selectedTables.includes(tableName)) continue;

      let filteredData = data[tableName];
      if (!filteredData || filteredData.length === 0) continue;

      const config = tableConfigs[tableName] || {
        searchFields: [],
        filters: [],
        columns: [],
      };

      // Define search fields dynamically if not present in config
      const searchFields = config.searchFields.length > 0
        ? config.searchFields
        : Object.keys(filteredData[0]).filter(key => typeof filteredData[0][key] === 'string');

      // Filter by search term
      if (searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        filteredData = filteredData.filter((row) => {
          return searchFields.some((field) => {
            const value = String(row[field] || "").toLowerCase();
            return value.includes(lowerCaseSearchTerm);
          });
        });
      }

      // Filter by advanced filters
      const tableFilters = filters[tableName];
      if (tableFilters) {
        filteredData = filteredData.filter((row) => {
          return Object.entries(tableFilters).every(([field, value]) => {
            if (Array.isArray(value)) {
              const parsedRowValue = parseFloat(row[field]);
              if (!isNaN(parsedRowValue)) {
                const [min, max] = value.map(v => v === '' ? null : parseFloat(v));
                const minCondition = min === null || parsedRowValue >= min;
                const maxCondition = max === null || parsedRowValue <= max;
                return minCondition && maxCondition;
              }
            }
            if (typeof row[field] === "string") {
              return row[field] === value;
            }
            return true;
          });
        });
      }

      if (filteredData.length > 0) {
        results.push({ tableName, data: filteredData, config: config });
      }
    }
    return results;
  }, [data, selectedTables, searchTerm, filters]);
  if (loading) {
    return <LoadingSpinner />;
  }

  if (loadingError) {
    return <ErrorDisplay error={loadingError} onRetry={loadCSVFiles} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 lg:p-12">
      <div className="max-w-full mx-auto flex flex-col lg:flex-row gap-6 h-full">
        <aside className="lg:w-[40%] space-y-6 flex flex-col h-full">
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <TableSelection
            selectedTables={selectedTables}
            handleTableToggle={handleTableToggle}
            data={data}
            uploadedTables={uploadedTables}
            removeUploadedTable={removeUploadedTable}
            onClearAll={onClearAll}
          />
          <AdvancedFilters
            showAdvancedFilters={showAdvancedFilters}
            setShowAdvancedFilters={setShowAdvancedFilters}
            selectedTables={selectedTables}
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
          <CSVUpload
            dragOver={dragOver}
            setDragOver={setDragOver}
            handleFileUpload={handleFileUpload}
            showUpload={showUpload}
            setShowUpload={setShowUpload}
            uploadedTables={uploadedTables}
            data={data}
            removeUploadedTable={removeUploadedTable}
          />
        </aside>
        <main className="lg:w-[60%] flex-1 flex flex-col h-full">
          <ResultsDisplay
            filteredResults={filteredResults}
            searchTerm={searchTerm}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
