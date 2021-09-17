import React from "react";

const RoomTableRow = (props) => {
  const { children } = props;
  return <div className="new-room-table-row border-bottom">{children}</div>;
};

export default React.memo(RoomTableRow);
