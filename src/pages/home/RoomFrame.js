import React, { useEffect, useState } from "react";
import DailyIframe from "@daily-co/daily-js";

import { updateParticipant, addMetric } from "../../utils/Network";
import "./Home.css";

const RoomFrame = (props) => {
  const { roomData, onLeaveRoom, roomName } = props;
  let callFrame = null;
  let inervalId = null;

  const getStats = async (userId) => {
    inervalId = setInterval(async () => {
      if (callFrame) {
        const stats = await callFrame.getNetworkStats();
        console.log();
        const metricsData = {
          userid: userId,
          roomname: roomName,
          videoRecvBitsPerSecond: stats.stats.latest.videoRecvBitsPerSecond,
          videoRecvPacketLoss: stats.stats.latest.videoRecvPacketLoss,
          videoSendBitsPerSecond: stats.stats.latest.videoSendBitsPerSecond,
          videoSendPacketLoss: stats.stats.latest.videoSendPacketLoss,
        };
        await addMetric(metricsData);
        console.log("callFrame.getNetworkStats()", callFrame, stats);
      } else {
        clearInterval(inervalId);
      }
    }, 15000);
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
        .on("joined-meeting", (e) => {
          // setUserId(e.participants.local.user_id);
          updateParticipant(roomName, e.participants.local.user_id);
          getStats(e.participants.local.user_id);
        })
        .on("error", (e) => {
          console.log("error", e);
        })
        .on("left-meeting", (e) => {
          onLeaveRoom();
          callFrame.leave();
          callFrame = null;
          document.getElementById("callframe").innerHTML = "";
          clearInterval(inervalId);
          console.log("left meeting", e);
        });

      callFrame.join({ url: roomData.url, showLeaveButton: true });
    };
    joinRoom();
  }, [roomData]);

  useEffect(() => {
    return clearInterval(inervalId);
  }, [inervalId]);

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
