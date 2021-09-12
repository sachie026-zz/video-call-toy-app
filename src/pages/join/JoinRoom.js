import React, { useState, useEffect } from "react";
import "./JoinRoom.css";
import DailyIframe from "@daily-co/daily-js";

const JoinRoom = () => {
  const [roomJoined, setRoomJoined] = useState(false);
  const [roomJoiningStatus, setRoomJoiningStatus] = useState("");
  const [roomUrl, setRoomUrl] = useState("");

  let callFrame = null;
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

    callFrame.join({ url: roomUrl, showLeaveButton: true });
  };

  return (
    <div className="data-container room-details-container">
      {!roomJoined && (
        <>
          <span className="new-room-label">Join room</span>
          <div className="room-details-section">
            <input
              type="text"
              placeholder="Enter room url..."
              onChange={(e) => setRoomUrl(e.target.value)}
            />
            <span>Provide room url and join</span>
            <button onClick={joinRoom}>Join room</button>
          </div>
        </>
      )}
      {roomJoined && (
        <div className="room-join-section">
          <div id="joinCallFrame"></div>
        </div>
      )}
    </div>
  );
};

export default JoinRoom;
