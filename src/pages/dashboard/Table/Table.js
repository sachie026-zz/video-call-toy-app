import React from "react";

const Table = (props) => {
  const { children } = props;
  return <div className="room-table">{children}</div>;
};

export default React.memo(Table);
