import React from "react";

const ShareRoomUrl = (props) => {
  const { roomData, onCopyUrl } = props;
  return (
    <div className="share-room-label">
      <span>Share URL below to invite others</span>
      <div className="copy-url-section">
        <span>{roomData ? roomData.url : "--"}</span>
        <button onClick={onCopyUrl}>Copy URL</button>
      </div>
    </div>
  );
};

export default React.memo(ShareRoomUrl);
