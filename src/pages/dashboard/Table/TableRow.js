import React from "react";

const TableRow = (props) => {
  const {
    columns,
    rowKey,
    isRoomTable,
    onDeleteClick,
    onFirstColumnClick,
    index,
  } = props;

  return (
    <div className="room-table-row" key={rowKey}>
      {columns.map((column, columnIndex) => (
        <span
          key={`${rowKey}${columnIndex}${index}`}
          onClick={() => onFirstColumnClick(columnIndex, index)}
        >
          {column}
        </span>
      ))}
      {isRoomTable ? (
        <button onClick={() => onDeleteClick(columns[0])}>Delete</button>
      ) : null}
    </div>
  );
};

export default React.memo(TableRow);
