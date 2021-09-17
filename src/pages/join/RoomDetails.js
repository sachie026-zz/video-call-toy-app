import React from "react";

const RoomDetails = (props) => {
  const { onRoomUrlChange, roomUrl, onJoinRoom, roomJoined } = props;
  return (
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
  );
};

export default React.memo(RoomDetails);
