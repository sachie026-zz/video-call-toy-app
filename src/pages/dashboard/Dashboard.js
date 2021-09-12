import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { getRooms, deleteRoom } from "../../utils/Network";

const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const fetchAllRooms = () => {
    getRooms()
      .then((response) => response.json())
      .then((res) => setRooms(res));
  };

  const onDeleteClick = async (name) => {
    await deleteRoom(name);
    await fetchAllRooms();
  };

  useEffect(() => {
    fetchAllRooms();
  }, []);

  return (
    <div className="data-container">
      <div className="room-label">Your rooms</div>
      <div className="room-table">
        <div className="room-table-header border-bottom">
          <span>Room name</span>
          <span>Date created</span>
        </div>

        {rooms.map((room, index) => (
          <div className="room-table-row" key={`room${index}`}>
            <span>{room.name}</span>
            <span>{new Date(room.created_at).toString()}</span>
            <button onClick={() => onDeleteClick(room.name)}>Delete</button>
          </div>
        ))}
        {rooms.length === 0 ? (
          <div className="room-table-row" key={`roomnodata`}>
            <span></span>
            <span>No rooms</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Dashboard;
