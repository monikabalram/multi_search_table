import { ChevronDown, ChevronUp, Database, Download, FileText, Trash2, Upload } from "lucide-react";

export const CSVUpload = ({ 
  dragOver, 
  setDragOver, 
  handleFileUpload, 
  showUpload, 
  setShowUpload, 
  uploadedTables, 
  data, 
  removeUploadedTable 
}) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const downloadSampleCSV = () => {
    const sampleCSV = `id,name,category,price,stock,rating,description
1,Sample Laptop,Electronics,999.99,15,4.5,High-performance laptop for professionals
2,Coffee Beans,Food,24.99,50,4.8,Premium organic coffee beans
3,Desk Chair,Furniture,199.99,8,4.2,Ergonomic office chair with lumbar support
4,Smartphone,Electronics,699.99,25,4.6,Latest model smartphone with advanced camera
5,Pizza Margherita,Food,12.99,100,4.3,Classic Italian pizza with fresh ingredients`;
    
    const blob = new Blob([sampleCSV], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_products.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-200 hover:border-blue-300 transition-all duration-200">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`p-8 text-center rounded-lg transition-all duration-300 ${
          dragOver 
            ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 scale-105 shadow-lg' 
            : 'hover:bg-gray-50'
        }`}
      >
        {dragOver ? (
          <div className="animate-bounce">
            <Upload className="mx-auto h-16 w-16 text-blue-500 mb-4" />
            <p className="text-xl font-bold text-blue-700 mb-2">
              Drop your CSV files here!
            </p>
            <p className="text-blue-600">Release to upload</p>
          </div>
        ) : (
          <div>
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Upload Your CSV Files
            </h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto">
              Drag and drop your CSV files here, or click the button below to browse. 
              Files will be automatically parsed and added to your search tables.
            </p>
            
            <div className="space-y-4">
              <input
                type="file"
                multiple
                accept=".csv"
                onChange={(e) => handleFileUpload(e.target.files)}
                className="hidden"
                id="csvUpload"
              />
              <label
                htmlFor="csvUpload"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 cursor-pointer transition-all transform hover:scale-105 shadow-md"
              >
                <FileText className="mr-2 h-5 w-5" />
                Choose CSV Files
              </label>
              
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <span>Supports: .csv files</span>
                <span>•</span>
                <span>Multiple files allowed</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200">
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm font-medium text-gray-700 flex items-center">
            <Database className="mr-2 h-4 w-4" />
            Upload Options & File Management
          </span>
          {showUpload ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showUpload && (
          <div className="px-6 pb-6 space-y-4 bg-gray-50">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900 mb-1">Need a sample CSV?</p>
                  <p className="text-sm text-gray-600">Download a template to see the expected format</p>
                </div>
                <button
                  onClick={downloadSampleCSV}
                  className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Sample
                </button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Upload Guidelines:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• CSV files should have headers in the first row</li>
                <li>• Maximum file size: 10MB per file</li>
                <li>• Filters will be auto-generated based on your data</li>
                <li>• Multiple files will create separate searchable tables</li>
              </ul>
            </div>

            {Object.keys(uploadedTables).length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="p-4 border-b border-gray-200">
                  <h4 className="font-medium text-gray-900 flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-green-600" />
                    Uploaded Files ({Object.keys(uploadedTables).length})
                  </h4>
                </div>
                <div className="p-4 space-y-3">
                  {Object.entries(uploadedTables).map(([tableName, fileName]) => (
                    <div key={tableName} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium text-green-900">{fileName}</p>
                          <p className="text-sm text-green-700">
                            {data[tableName]?.length || 0} rows • Table: {tableName}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeUploadedTable(tableName)}
                        className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                        title="Remove this table"
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};