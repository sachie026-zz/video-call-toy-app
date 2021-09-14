import React, { useState, useEffect } from "react";
import "./Home.css";
import { createRoom } from "../../utils/Network";
import CreateRoom from "./CreateRoom";
import RoomFrame from "./RoomFrame";

const Home = () => {
  const [roomCreated, setRoomCreated] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const [roomName, setRoomName] = useState("");
  const onCreateRoom = () => {
    createRoom(roomName)
      .then((response) => response.json())
      .then((res) => setRoomData(res));
  };

  useEffect(() => {
    if (roomData && roomData.name && roomData.api_created) {
      setRoomCreated(true);
    }
  }, [roomData]);

  return (
    <div className="data-container">
      {!roomCreated && (
        <CreateRoom
          onCreateRoom={onCreateRoom}
          onNameChange={(value) => setRoomName(value)}
          buttonDisabled={roomName && roomName.length > 0 ? false : true}
        />
      )}
      {roomCreated && (
        <RoomFrame
          roomData={roomData}
          onLeaveRoom={() => setRoomCreated(false)}
          roomName={roomName}
        />
      )}
    </div>
  );
};

export default Home;
