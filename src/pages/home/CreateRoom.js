import React from "react";

import CreateRoomHeader from "./CreateRoomHeader";
import CreateRoomPrivacy from "./CreateRoomPrivacy";
import CreateRoomInput from "./CreateRoomInput";
import "./Home.css";

const CreateRoom = (props) => {
  const { onCreateRoom, buttonDisabled, onNameChange } = props;
  const onNameInputChange = (e) => onNameChange(e.target.value);

  return (
    <div>
      <CreateRoomHeader
        onCreateRoom={onCreateRoom}
        buttonDisabled={buttonDisabled}
      />
      <div className="new-room-table">
        <div className="new-room-table-row border-bottom">
          <CreateRoomInput onNameInputChange={onNameInputChange} />
        </div>
        <div className="new-room-table-row">
          <CreateRoomPrivacy />
        </div>
      </div>
    </div>
  );
};

export default React.memo(CreateRoom);
