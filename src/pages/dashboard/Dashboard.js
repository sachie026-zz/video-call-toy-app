import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { getRooms, deleteRoom } from "../../utils/Network";
import Table from "./Table";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import ParticipantsTable from "./ParticipantsTable";

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);
  const fetchAllRooms = () => {
    getRooms()
      .then((response) => response.json())
      .then((res) => setRooms(res));
  };

  const onDeleteClick = async (name) => {
    await deleteRoom(name);
    await fetchAllRooms();
  };

  const onNameClick = (index) => {
    console.log(index);
    setSelectedRoomIndex(index);
  };

  useEffect(() => {
    fetchAllRooms();
  }, []);

  return (
    <div className="data-container">
      {selectedRoomIndex >= 0 ? (
        `${rooms[selectedRoomIndex].name} participants`
      ) : (
        <div className="room-label">Your rooms</div>
      )}
      {selectedRoomIndex >= 0 ? (
        <ParticipantsTable
          participants={rooms[selectedRoomIndex].participants}
        />
      ) : (
        <Table>
          <TableHeader columns={["Room name", "Date created"]} />
          {rooms.map((room, index) => (
            <TableRow
              columns={[room.name, new Date(room.created_at).toString()]}
              key={`room${index}`}
              onFirstColumnClick={(columnIndex) =>
                columnIndex === 0 ? onNameClick(index) : null
              }
              onDeleteClick={onDeleteClick}
              isRoom
            />
          ))}
          {rooms.length === 0 ? (
            <TableRow columns={["", "No rooms"]} key="roomnodata" />
          ) : null}
        </Table>
      )}
    </div>
  );
};

export default Dashboard;
