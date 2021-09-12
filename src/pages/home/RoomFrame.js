import React, { useEffect } from "react";
import DailyIframe from "@daily-co/daily-js";
import "./Home.css";

const RoomFrame = (props) => {
  const { roomData } = props;
  let callFrame = null;

  const getStats = async () => {
    const stats = await callFrame.getNetworkStats();
    console.log("callFrame.getNetworkStats()", callFrame, stats);
  };

  useEffect(() => {
    const joinRoom = async () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      callFrame = DailyIframe.createFrame(
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

      callFrame.join({ url: roomData.url, showLeaveButton: true });
    };
    joinRoom();
  }, [roomData]);

  return (
    <div className="frame-container">
      <div id="callframe"></div>
      <div className="share-room-label">
        <span>{roomData ? roomData.url : "--"}</span>
        Share room url with others
      </div>
      <button onClick={getStats}>Get stats</button>
    </div>
  );
};

export default RoomFrame;
