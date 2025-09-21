function Table({ name, data }) {
  if (!data || data.length === 0) {
    return null;
  }

  const headers = Object.keys(data[0]);

  return (
    <div className="table-container">
      <h3>{name}</h3>
      <table>
        <thead>
          <tr>
            {headers.map(header => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map(header => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;