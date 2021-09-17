import React from "react";

import Table from "./Table/Table";
import TableHeader from "./Table/TableHeader";
import TableRow from "./Table/TableRow";
import "./Dashboard.css";

// keeping out the fixed columns from component, to prevent from re-rendering
const roomColumns = ["Room name", "Date created"];
const noRoomColumns = ["", "No rooms"];

const RoomsTable = (props) => {
  const { rooms, onFirstColumnClick, onDeleteClick } = props;

  return (
    <Table>
      <TableHeader columns={roomColumns} compkey="rooms" />
      {rooms.map((room, index) => (
        <TableRow
          columns={[room.name, new Date(room.created_at).toString()]}
          key={`rooms${index}`}
          rowKey={`room${index}`}
          index={index}
          onFirstColumnClick={onFirstColumnClick}
          onDeleteClick={onDeleteClick}
          isRoomTable
        />
      ))}
      {rooms.length === 0 ? (
        <TableRow columns={noRoomColumns} key="roomnodata" />
      ) : null}
    </Table>
  );
};

export default React.memo(RoomsTable);
