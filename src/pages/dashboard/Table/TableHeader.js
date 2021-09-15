import React from "react";

const TableHeader = (props) => {
  const { columns, compkey } = props;
  return (
    <div className="room-table-header border-bottom">
      {columns.map((column, index) => (
        <span key={`${compkey}${index}`}>{column}</span>
      ))}
    </div>
  );
};

export default TableHeader;
