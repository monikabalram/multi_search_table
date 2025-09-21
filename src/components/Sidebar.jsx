function Sidebar({ tableNames, selectedTables, onTableSelection, searchQuery, onSearchChange }) {
  return (
    <div className="sidebar">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="table-selection">
        <h3>Tables to Search</h3>
        {tableNames.map(name => (
          <div key={name} className="table-option">
            <input
              type="checkbox"
              id={name}
              checked={selectedTables.includes(name)}
              onChange={(e) => onTableSelection(name, e.target.checked)}
            />
            <label htmlFor={name}>{name}</label>
          </div>
        ))}
      </div>
      {/* Additional filter chips can go here */}
    </div>
  );
}

export default Sidebar;