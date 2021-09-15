import React from "react";

const TableRow = (props) => {
  const {
    columns,
    key,
    isRoomTable,
    onDeleteClick,
    onShowMetrics,
    onFirstColumnClick,
    index,
  } = props;

  return (
    <div className="room-table-row" key={key}>
      {columns.map((column, columnIndex) => (
        <span
          key={`header${index}`}
          onClick={() => onFirstColumnClick(columnIndex, index)}
        >
          {column}
        </span>
      ))}
      {isRoomTable ? (
        <button onClick={() => onDeleteClick(columns[0])}>Delete</button>
      ) : (
        <button onClick={onShowMetrics}>Show Metrics</button>
      )}
    </div>
  );
};

export default TableRow;
