import React, { useEffect, useState, useCallback } from "react";

import { getRooms, deleteRoom } from "../../utils/ApiUtil";
import RoomsTable from "./RoomsTable";
import ParticipantsTable from "./ParticipantsTable";
import DashboardHeader from "./DashboardHeader";
import "./Dashboard.css";

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);

  const fetchAllRooms = () => {
    getRooms()
      .then((response) => response.json())
      .then((res) => setRooms(res));
  };

  const onDeleteClick = useCallback(async (name) => {
    await deleteRoom(name);
    await fetchAllRooms();
  }, []);

  const onNameClick = (index) => {
    setSelectedRoomIndex(index);
  };

  const goBack = useCallback(() => {
    setSelectedRoomIndex(null);
  }, []);

  const onFirstColumnClick = useCallback((columnIndex, index) => {
    if (columnIndex === 0) onNameClick(index);
  }, []);

  useEffect(() => {
    fetchAllRooms();
  }, []);

  return (
    <div className="data-container">
      <DashboardHeader
        selectedRoomIndex={selectedRoomIndex}
        goBack={goBack}
        selectedRoomName={
          selectedRoomIndex ? rooms[selectedRoomIndex].name : ""
        }
      />

      {selectedRoomIndex !== null ? (
        <ParticipantsTable
          participants={rooms[selectedRoomIndex].participants}
        />
      ) : (
        <RoomsTable
          rooms={rooms}
          onFirstColumnClick={onFirstColumnClick}
          onDeleteClick={onDeleteClick}
        />
      )}
    </div>
  );
};

export default Dashboard;
