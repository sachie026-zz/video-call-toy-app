import React from "react";
import './NetworkStats.css'

const NetworkStats = (props) => {
  return (
    <div className="network-stats-container">
      <span className="network-stats-label">Network Stats</span>
      <div className="netowrk-stats-row">
        <span>Video Sending: 0</span>
        <span>packet Loss Send: 123</span>
      </div>
      <div className="netowrk-stats-row">
        <span>Video Recieving: 0</span>
        <span>packet Loss Recieve: 1</span>
      </div>
    </div>
  );
};

export default React.memo(NetworkStats);
