import React, { useState, useEffect, useCallback } from "react";

import { createRoom } from "../../utils/ApiUtil";
import CreateRoom from "./CreateRoom";
import RoomFrame from "./RoomFrame";
import "./Home.css";

const Home = () => {
  const [roomCreated, setRoomCreated] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const [roomName, setRoomName] = useState("");

  const onCreateRoom = useCallback(() => {
    createRoom(roomName)
      .then((response) => response.json())
      .then((res) => {
        setRoomData(res);
      });
  }, [roomName]);

  const updateRoomCreated = useCallback(() => {
    setRoomCreated(false);
  }, []);

  const updateRoomName = useCallback((value) => {
    setRoomName(value);
  }, []);

  useEffect(() => {
    if (roomData && roomData.name && roomData.api_created) {
      setRoomCreated(true);
    }
  }, [roomData]);

  return (
    <div className="data-container">
      {roomCreated ? (
        <RoomFrame
          roomData={roomData}
          onLeaveRoom={updateRoomCreated}
          roomName={roomName}
        />
      ) : (
        <CreateRoom
          onCreateRoom={onCreateRoom}
          onNameChange={updateRoomName}
          buttonDisabled={roomName && roomName.length > 0 ? false : true}
        />
      )}
    </div>
  );
};

export default Home;
