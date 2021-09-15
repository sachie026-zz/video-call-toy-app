import React from "react";

import Table from "./Table/Table";
import TableHeader from "./Table/TableHeader";
import TableRow from "./Table/TableRow";
import "./Dashboard.css";

const RoomsTable = (props) => {
  const { rooms, onFirstColumnClick, onDeleteClick } = props;

  return (
    <Table>
      <TableHeader columns={["Room name", "Date created"]} />
      {rooms.map((room, index) => (
        <TableRow
          columns={[room.name, new Date(room.created_at).toString()]}
          key={`room${index}`}
          index={index}
          onFirstColumnClick={onFirstColumnClick}
          onDeleteClick={onDeleteClick}
          isRoomTable
        />
      ))}
      {rooms.length === 0 ? (
        <TableRow columns={["", "No rooms"]} key="roomnodata" />
      ) : null}
    </Table>
  );
};

export default React.memo(RoomsTable);
