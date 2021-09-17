import React from "react";

const CreateRoomInput = (props) => {
  const { onNameInputChange } = props;
  return (
    <>
      <div className="new-room-table-column">
        <span>Room name</span>
        <span>Required</span>
      </div>
      <div className="new-room-input">
        <input
          type="text"
          placeholder="Enter room name..."
          onChange={onNameInputChange}
        />
      </div>
    </>
  );
};

export default CreateRoomInput;
