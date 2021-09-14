import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { getRooms, deleteRoom } from "../../utils/Network";
import Table from "./Table";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import ParticipantsTable from "./ParticipantsTable";
import BackButton from "../../components/BackButton";

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
    setSelectedRoomIndex(index);
  };

  const goBack = () => {
    setSelectedRoomIndex(null);
  };

  useEffect(() => {
    fetchAllRooms();
  }, []);

  return (
    <div className="data-container">
      {selectedRoomIndex !== null ? (
        <>
          <BackButton previous="Rooms" goBack={goBack} />
          <span className="participants-label">{`${rooms[selectedRoomIndex].name} participants`}</span>
        </>
      ) : (
        <div className="room-label">Your rooms</div>
      )}
      {selectedRoomIndex !== null ? (
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
