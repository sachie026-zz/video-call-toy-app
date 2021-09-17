import React from "react";

const RoomTable = (props) => {
  const { children } = props;
  return <div className="new-room-table">{children}</div>;
};

export default React.memo(RoomTable);
