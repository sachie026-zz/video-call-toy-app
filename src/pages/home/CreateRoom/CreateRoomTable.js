import React from "react";

const CreateRoomTable = (props) => {
  const { children } = props;
  return <div className="new-room-table">{children}</div>;
};

export default React.memo(CreateRoomTable);
