import React, { useState, useEffect, useCallback } from "react";

import { createRoom } from "../../utils/ApiUtil";
import CreateRoom from "./CreateRoom/CreateRoom";
import RoomFrame from "./RoomFrame/RoomFrame";
import Loader from "../../components/Loader";
import "./Home.css";

const Home = () => {
  const [roomCreated, setRoomCreated] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [creatingRoom, setCreatingRoom] = useState(false);

  const onCreateRoom = useCallback(() => {
    setCreatingRoom(true);
    createRoom(roomName)
      .then((response) => response.json())
      .then((res) => {
        if (res && res.name === "Error") {
          alert(
            "Error while creating room! check if room with provided name is already present"
          );
        } else {
          setRoomData(res);
        }
        setCreatingRoom(false);
      })
      .catch((err) => console.log(err));
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
      {creatingRoom && <Loader label="creating room..." />}
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
