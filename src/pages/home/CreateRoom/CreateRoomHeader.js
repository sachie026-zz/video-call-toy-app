import React from "react";

const CreateRoomHeader = (props) => {
  const { onCreateRoom, buttonDisabled } = props;
  return (
    <div className="new-room-bar">
      <span className="new-room-label">Create a new room</span>
      <button
        className="create-button"
        onClick={onCreateRoom}
        disabled={buttonDisabled}
      >
        Create room
      </button>
    </div>
  );
};

export default CreateRoomHeader;
