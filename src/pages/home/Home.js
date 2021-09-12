import React, { useState, useEffect } from "react";
import "./Home.css";
import { getRooms, createRoom } from "../../utils/Network";
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
    console.log("roomData", roomData);
  }, [roomData]);

  /*
  callFrame = await window.DailyIframe.createFrame(
    document.getElementById('callframe'),
    {
      iframeStyle: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '90%',
        border: '0',
      },
    }
  );

  callFrame
    .on('loaded', showEvent)
    .on('joining-meeting', showEvent)
    .on('joined-meeting', showCallDisplay)
    .on('error', showEvent)
    .on('participant-joined', updateParticipantInfoDisplay)
    .on('participant-updated', updateParticipantInfoDisplay)
    .on('participant-left', updateParticipantInfoDisplay)
    .on('left-meeting', hideCallDisplay);
  */
  return (
    <div className="data-container">
      {!roomCreated && (
        <CreateRoom
          onCreateRoom={onCreateRoom}
          onNameChange={(value) => setRoomName(value)}
          buttonDisabled={roomName && roomName.length > 0 ? false : true}
        />
      )}
      {roomCreated && <RoomFrame roomData={roomData} />}
    </div>
  );
};

export default Home;
