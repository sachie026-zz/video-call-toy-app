import React, { useState } from "react";
import "./Home.css";

import { getRooms, createRoom } from "../../utils/Network";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  getRooms()
    .then((response) => response.json())
    .then((res) => setRooms(res.data));

  const onCreateRoom = () => {
    createRoom()
  }  
  return (
    <div className="data-container">
      Your rooms
      <button className="create-button">Create room</button>
      {rooms.map((room, index) => (
        <div>
          {room.name}
          {room.created_at}
        </div>
      ))}
    </div>
  );
};

export default Home;
