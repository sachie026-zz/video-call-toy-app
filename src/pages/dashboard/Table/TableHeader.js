import React from "react";

const TableHeader = (props) => {
  const { columns } = props;
  return (
    <div className="room-table-header border-bottom">
      {columns.map((column, index) => (
        <span key={`header${index}`}>{column}</span>
      ))}
    </div>
  );
};

export default TableHeader;
