import React, { useEffect } from "react";
import DailyIframe from "@daily-co/daily-js";

import { updateParticipant, addMetric } from "../../utils/ApiUtil";
import { buildMetricsData } from "../../utils/SharedUtil";
import "./Home.css";

const RoomFrame = (props) => {
  const { roomData, onLeaveRoom, roomName } = props;
  let callFrame = null;
  let inervalId = null;

  const onCopyUrl = () => {
    document.execCommand("copy");
  };

  const getNetworkStats = async (userId) => {
    inervalId = setInterval(async () => {
      if (callFrame) {
        const networkStats = await callFrame.getNetworkStats();
        const metricsData = buildMetricsData(userId, networkStats, roomName);
        await addMetric(metricsData);
      } else {
        clearInterval(inervalId);
      }
    }, 15000); // polling for stats after every 15 seconds
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
        .on("joined-meeting", async (e) => {
          await updateParticipant(roomName, e.participants.local.user_id);
          getNetworkStats(e.participants.local.user_id);
        })
        .on("error", (e) => {
          console.log("error", e);
        })
        .on("left-meeting", (e) => {
          callFrame.leave();
          callFrame.destroy();
          document.getElementById("callframe").innerHTML = "";
          clearInterval(inervalId);
          onLeaveRoom();
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
        <span>Share URL below to invite others</span>
        <div className="copy-url-section">
          <span>{roomData ? roomData.url : "--"}</span>
          <button onClick={onCopyUrl}>Copy URL</button>
        </div>
      </div>
    </div>
  );
};

export default RoomFrame;
