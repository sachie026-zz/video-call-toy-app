import React from "react";
import "./NetworkStats.css";

const NetworkStats = (props) => {
  const { networkStats } = props;
  console.log("networkStats", networkStats);
  return (
    <div className="network-stats-container">
      <span className="network-stats-label">Network Stats</span>
      <div className="netowrk-stats-row">
        <span className="row-key">Video Sending </span>
        <span className="row-value">{networkStats.videoSendBitsPerSecond}</span>
        <span className="row-key">Packet Loss Send </span>
        <span className="row-value">{networkStats.videoSendPacketLoss}</span>
      </div>
      <div className="netowrk-stats-row">
        <span className="row-key">Video Recieving </span>
        <span className="row-value">{networkStats.videoRecvBitsPerSecond}</span>
        <span className="row-key">Packet Loss Recieve </span>
        <span className="row-value">{networkStats.videoRecvPacketLoss}</span>
      </div>
    </div>
  );
};

export default NetworkStats;
