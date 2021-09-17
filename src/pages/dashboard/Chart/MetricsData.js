import React, { useCallback, useEffect, useState } from "react";

import StockChart from "./StockChart";
import Loader from "../../../components/Loader/Loader";
import { getMetrics } from "../../../utils/ApiUtil";

const MetricsData = (props) => {
  const { selectedParticipantId, roomName } = props;
  const [loadingState, setLoadingState] = useState(false);
  const [participantMetricsData, setParticipantsMetricsData] = useState([]);

  const [videoSendData, setVideoSendData] = useState([]);
  const [videoSendPacketLossData, setVideoSendPacketLossData] = useState([]);
  const [videoRecieveData, setVideoRecieveData] = useState([]);
  const [videoRecievePacketLossData, setVideoRecievePacketLossData] = useState(
    []
  );

  const updateMetricsData = useCallback(() => {
    const tempRecieveData = [];
    const tempSendData = [];
    const tempRecievePacketLosttData = [];
    const tempSendPacketLossData = [];

    participantMetricsData.forEach((metric) => {
      tempRecieveData.push([
        new Date(metric.created_at).getTime(),
        metric.videoRecvBitsPerSecond,
      ]);
      tempSendData.push([
        new Date(metric.created_at).getTime(),
        metric.videoSendBitsPerSecond,
      ]);
      tempSendPacketLossData.push([
        new Date(metric.created_at).getTime(),
        metric.videoSendPacketLoss,
      ]);
      tempRecievePacketLosttData.push([
        new Date(metric.created_at).getTime(),
        metric.videoRecvPacketLoss,
      ]);
    });

    setVideoSendData(tempSendData);
    setVideoSendPacketLossData(tempSendPacketLossData);
    setVideoRecieveData(tempRecieveData);
    setVideoRecievePacketLossData(tempRecievePacketLosttData);
  }, [participantMetricsData]);

  const fetchMetricsData = useCallback(async () => {
    setLoadingState(true);
    await getMetrics(selectedParticipantId, roomName)
      .then((response) => response.json())
      .then((res) => {
        setLoadingState(false);
        setParticipantsMetricsData(res);
      });
  }, [roomName, selectedParticipantId]);

  useEffect(() => {
    fetchMetricsData();
  }, [fetchMetricsData, roomName, selectedParticipantId]);

  useEffect(() => {
    if (participantMetricsData.length) {
      updateMetricsData();
    }
  }, [participantMetricsData, updateMetricsData]);

  return (
    <div className="metrics-data-container">
      {loadingState && <Loader label={loadingState.current} />}

      <StockChart title="Video sending" metricsData={videoSendData} />
      <StockChart
        title="Packet loss send"
        metricsData={videoSendPacketLossData}
      />
      <StockChart title="Video recieving" metricsData={videoRecieveData} />
      <StockChart
        title="Packet loss recieve"
        metricsData={videoRecievePacketLossData}
      />
    </div>
  );
};

export default MetricsData;
