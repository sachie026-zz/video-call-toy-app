import React, { useEffect } from "react";
import DailyIframe from "@daily-co/daily-js";
import "./Home.css";

const RoomFrame = (props) => {
  const { roomData } = props;
  let callFrame = null;

  const joinRoom = async () => {
    callFrame = await DailyIframe.createFrame(
      document.getElementById("callframe"),
      {
        iframeStyle: {
          position: "relative",
          top: "0",
          left: "0",
          width: "500px",
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
        console.log("left meeting", e);
      });

    callFrame.join({ url: roomData.url });
  };

  useEffect(() => {
    joinRoom();
  }, [roomData]);

  return (
    <div className="frame-container">
      <div id="callframe"></div>
      <div className="share-room-label">
        <span>{roomData ? roomData.url : "--"}</span>
        Share room url with others
      </div>
    </div>
  );
};

export default RoomFrame;
