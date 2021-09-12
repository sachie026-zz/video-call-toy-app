import React from "react";
import "./Home.css";

const noop = () => null;

const CreateRoom = (props) => {
  const { onCreateRoom, buttonDisabled, onNameChange } = props;
  return (
    <div>
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
      <div className="new-room-table">
        <div className="new-room-table-row border-bottom">
          <div className="new-room-table-column">
            <span>Room name</span>
            <span>Required</span>
          </div>
          <div className="new-room-input">
            <input
              type="text"
              placeholder="Enter room name..."
              onChange={(e) => onNameChange(e.target.value)}
            />
          </div>
        </div>
        <div className="new-room-table-row">
          <div className="new-room-table-column">
            <span>Privacy</span>
            <span>Limit who can access the room</span>
          </div>
          <div className="new-room-radio">
            <input type="radio" onChange={noop} checked />
            <span className="privacy-label">
              Public: anyone with the link can join
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
