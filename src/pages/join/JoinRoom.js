import React, { useState, useEffect, useCallback, useRef } from "react";
import DailyIframe from "@daily-co/daily-js";

import NetworkStats from "../../components/NetworkStats/NetworkStats";
import NoRoomJoined from "./NoRoomJoined";
import { updateParticipant, addMetric } from "../../utils/ApiUtil";
import { buildMetricsData } from "../../utils/SharedUtil";
import "./JoinRoom.css";

const JoinRoom = () => {
  const [roomJoined, setRoomJoined] = useState(false);
  const [roomUrl, setRoomUrl] = useState("");
  const callFrameState = useRef(null);
  const [networkStats, setNetworkStats] = useState(null);

  let callFrame = null;
  let inervalId = useRef(null);

  const onRoomUrlChange = (e) => setRoomUrl(e.target.value);

  const getNetworkStats = useCallback(
    async (userId, roomName) => {
      let intervalIndex = setInterval(async () => {
        if (callFrameState.current) {
          const networkStats = await callFrameState.current.getNetworkStats();
          const metricsData = buildMetricsData(userId, networkStats, roomName);
          setNetworkStats(networkStats.stats.latest);
          await addMetric(metricsData);
        }
      }, 15000); // polling for stats after every 15 seconds
      inervalId.current = intervalIndex;
    },
    [callFrameState]
  );

  const onMeetingJoined = useCallback(
    async (userId) => {
      const roomUrlArray = roomUrl.split("/");
      const roomName = roomUrlArray[roomUrlArray.length - 1];
      await updateParticipant(roomName, userId);
      getNetworkStats(userId, roomName);
      setRoomJoined(true);
    },
    [getNetworkStats, roomUrl]
  );

  const onMeetingLeft = () => {
    setRoomJoined(false);
    setRoomUrl("");
    setNetworkStats(false);
    document.getElementById("joinCallFrame").innerHTML = "";
  };

  const onJoinRoom = useCallback(async () => {
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
      .on("joined-meeting", async (e) => {
        onMeetingJoined(e.participants.local.user_id);
      })
      .on("error", (e) => {
        console.log("error", e);
      })
      .on("left-meeting", (e) => {
        onMeetingLeft();
        callFrame.leave();
        callFrame.destory();
      });

    callFrameState.current = callFrame;
    callFrame.join({ url: roomUrl, showLeaveButton: true });
  }, [roomUrl]);

  useEffect(() => {
    return clearInterval(inervalId.current);
  }, [inervalId]);

  return (
    <div className="data-container room-details-container">
      <div className="room-details-section-container">
        <span className="new-room-label">Join room</span>
        <div className="room-details-section">
          <input
            type="text"
            placeholder="Enter room url..."
            value={roomUrl}
            onChange={onRoomUrlChange}
          />
          <span>Provide room url and join</span>
          <button onClick={onJoinRoom} disabled={roomJoined}>
            Join room
          </button>
        </div>
      </div>

      <div className="room-join-section">
        <div className="room-frame">
          <div id="joinCallFrame"></div>
        </div>
        <div className="room-stats">
          {networkStats ? <NetworkStats networkStats={networkStats} /> : null}
        </div>
        {!roomJoined ? <NoRoomJoined /> : null}
      </div>
    </div>
  );
};

export default JoinRoom;
