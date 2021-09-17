import React, { useEffect, useState, useCallback } from "react";
import DailyIframe from "@daily-co/daily-js";
import copy from "copy-to-clipboard";

import NetworkStats from "../../../components/NetworkStats/NetworkStats";
import ShareRoomUrl from "./ShareRoomUrl";
import { updateParticipant, addMetric } from "../../../utils/ApiUtil";
import { buildMetricsData } from "../../../utils/SharedUtil";

const RoomFrame = (props) => {
  const [statsData, setStatData] = useState(null);
  const { roomData, onLeaveRoom, roomName } = props;
  let callFrame = null;
  let inervalId = null;

  const onCopyUrl = useCallback(
    () => copy(roomData ? roomData.url : ""),
    [roomData]
  );

  const onMeetingLeft = useCallback(() => {
    document.getElementById("callframe").innerHTML = "";
    clearInterval(inervalId);
    onLeaveRoom();
  }, [inervalId, onLeaveRoom]);

  const getNetworkStats = async (userId) => {
    inervalId = setInterval(async () => {
      if (callFrame) {
        const networkStats = await callFrame.getNetworkStats();
        const metricsData = buildMetricsData(userId, networkStats, roomName);
        setStatData(networkStats.stats.latest);
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
            width: "700px",
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
          onMeetingLeft();
        });

      callFrame.join({ url: roomData.url, showLeaveButton: true });
    };
    joinRoom();
  }, [roomData]);

  useEffect(() => {
    return () => {
      clearInterval(inervalId);
      if (callFrame) {
        callFrame.destroy();
      }
    };
  }, [callFrame, inervalId, onMeetingLeft]);

  return (
    <div className="frame-container">
      <div id="callframe"></div>
      <div className="callframe-data">
        <ShareRoomUrl roomData={roomData} onCopyUrl={onCopyUrl} />
        {statsData ? <NetworkStats networkStats={statsData} /> : null}
      </div>
    </div>
  );
};

export default RoomFrame;
