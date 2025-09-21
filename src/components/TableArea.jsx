import Table from './Table';

function TableArea({ tables }) {
  return (
    <div className="table-area">
      {tables.length > 0 ? (
        tables.map((table, index) => (
          <Table key={index} name={table.name} data={table.content} />
        ))
      ) : (
        <p>No tables selected or no results found.</p>
      )}
    </div>
  );
}

export default TableArea;