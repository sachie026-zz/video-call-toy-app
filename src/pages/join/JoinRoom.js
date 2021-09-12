import React, { useState, useEffect } from "react";
import DailyIframe from "@daily-co/daily-js";
import "./JoinRoom.css";

const JoinRoom = () => {
  const [roomJoined, setRoomJoined] = useState(false);
  const [callFrameState, setCallFrameState] = useState(null);
  const [roomJoiningStatus, setRoomJoiningStatus] = useState("");
  const [roomUrl, setRoomUrl] = useState("");

  let callFrame = null;

  const getStats = async () => {
    console.log("callFrame.getNetworkStats()", callFrame);
    if (callFrameState) {
      const stats = await callFrameState.getNetworkStats();
      const sess = await callFrameState.room();

      console.log("callFrame.getNetworkStats()", callFrame, stats, sess);
    }
  };

  const joinRoom = async () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    callFrame = DailyIframe.createFrame(
      document.getElementById("joinCallFrame"),
      {
        iframeStyle: {
          position: "relative",
          width: "575px",
          height: "600px",
          border: "0",
        },
      }
    );

    callFrame
      .on("loaded", (e) => {
        console.log("loaded", e);
      })
      .on("joining-meeting", (e) => {
        console.log("joining meeting", e);
      })
      .on("joined-meeting", (e) => {
        if (e.action === "joined-meeting") {
          setRoomJoined(true);
        }
        console.log("joined meeting", e);
      })
      .on("error", (e) => {
        console.log("error", e);
      })
      .on("participant-joined", (e) => {
        console.log("participant joined", e);
      })
      .on("participant-updated", (e) => {
        console.log("participant updatd", e);
      })
      .on("participant-left", (e) => {
        console.log("participants left", e);
      })
      .on("left-meeting", (e) => {
        setRoomJoined(false);
        console.log("left meeting", e);
      });

    setCallFrameState(callFrame);
    callFrame.join({ url: roomUrl, showLeaveButton: true });
  };

  return (
    <div className="data-container room-details-container">
      <div className="room-details-section-container">
        <span className="new-room-label">Join room</span>
        <div className="room-details-section">
          <input
            type="text"
            placeholder="Enter room url..."
            onChange={(e) => setRoomUrl(e.target.value)}
          />
          <span>Provide room url and join</span>
          <button onClick={joinRoom} disabled={roomJoined}>
            Join room
          </button>
        </div>
      </div>

      <div className="room-join-section">
        <div className="room-frame">
          <div id="joinCallFrame"></div>
        </div>
        <div className="room-stats">
          {roomJoined ? <button onClick={getStats}>Get stats</button> : null}
        </div>
      </div>
      {/* <JoinRoomFrame roomUrl={roomUrl} /> */}
    </div>
  );
};

export default JoinRoom;
