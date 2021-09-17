import React, { useEffect, useState, useCallback } from "react";

import { getRooms, deleteRoom } from "../../utils/ApiUtil";
import RoomsTable from "./RoomsTable";
import ParticipantsTable from "./ParticipantsTable";
import DashboardHeader from "./DashboardHeader";
import MetricsData from "./Chart/MetricsData";
import Loader from "../../components/Loader";
import "./Dashboard.css";

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);
  const [selectedParticipantIndex, setSelectedParticipantIndex] =
    useState(null);

  const getSelectedParticipantUserId =
    selectedRoomIndex !== null && selectedParticipantIndex !== null
      ? rooms[selectedRoomIndex].participants[selectedParticipantIndex].userid
      : "";

  const selectedRoomName =
    selectedRoomIndex !== null ? rooms[selectedRoomIndex].name : "";

  const fetchAllRooms = () => {
    setLoadingState(true);
    getRooms()
      .then((response) => response.json())
      .then((res) => {
        setLoadingState(false);
        setRooms(res);
      });
  };

  const onDeleteClick = useCallback(async (name) => {
    await deleteRoom(name);
    await fetchAllRooms();
  }, []);

  const goBack = useCallback(() => {
    if (selectedParticipantIndex !== null) {
      // if participant is selected, move back to participants list from metrics page
      setSelectedParticipantIndex(null);
    } else if (selectedRoomIndex !== null) {
      // if room is selected, move back to rooms list page from participants page
      setSelectedRoomIndex(null);
    }
  }, [selectedParticipantIndex, selectedRoomIndex]);

  const onRoomNameClick = useCallback((columnIndex, index) => {
    if (columnIndex === 0) setSelectedRoomIndex(index);
  }, []);

  const onParticipantClick = useCallback((columnIndex, index) => {
    if (columnIndex === 0) setSelectedParticipantIndex(index);
  }, []);

  useEffect(() => {
    fetchAllRooms();
  }, []);

  return (
    <div className="data-container">
      <DashboardHeader
        selectedRoomIndex={selectedRoomIndex}
        goBack={goBack}
        selectedRoomName={selectedRoomName}
      />
      {loadingState && <Loader label="loading..." />}

      {/* 
        - Check if any room is selected i.e. selectedRoomIndex !== null
        - Check if any participant is selected   i.e.  selectedParticipantIndex !== null 
      */}

      {selectedRoomIndex !== null ? (
        selectedParticipantIndex !== null ? (
          <MetricsData
            selectedParticipantId={getSelectedParticipantUserId}
            roomName={selectedRoomName}
          />
        ) : (
          <ParticipantsTable
            participants={rooms[selectedRoomIndex].participants}
            onFirstColumnClick={onParticipantClick}
          />
        )
      ) : (
        <RoomsTable
          rooms={rooms}
          onFirstColumnClick={onRoomNameClick}
          onDeleteClick={onDeleteClick}
        />
      )}
    </div>
  );
};

export default Dashboard;
