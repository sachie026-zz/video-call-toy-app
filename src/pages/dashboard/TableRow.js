import React from "react";

const TableRow = (props) => {
  const {
    columns,
    key,
    isRoom,
    onDeleteClick,
    onShowMetrics,
    onFirstColumnClick,
  } = props;
  return (
    <div className="room-table-row" key={key}>
      {columns.map((column, index) => (
        <span key={`header${index}`} onClick={() => onFirstColumnClick(index)}>
          {column}
        </span>
      ))}
      {isRoom ? (
        <button onClick={() => onDeleteClick(columns[0])}>Delete</button>
      ) : (
        <button onClick={() => onShowMetrics()}>Show Metrics</button>
      )}
    </div>
  );
};

export default TableRow;
