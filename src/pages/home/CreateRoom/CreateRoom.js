import React from "react";

import RoomTable from "./RoomTable";
import RoomTableRow from "./RoomTableRow";
import CreateRoomHeader from "./CreateRoomHeader";
import CreateRoomPrivacy from "./CreateRoomPrivacy";
import CreateRoomInput from "./CreateRoomInput";

const CreateRoom = (props) => {
  const { onCreateRoom, buttonDisabled, onNameChange } = props;
  const onNameInputChange = (e) => onNameChange(e.target.value);

  return (
    <div>
      <CreateRoomHeader
        onCreateRoom={onCreateRoom}
        buttonDisabled={buttonDisabled}
      />
      <RoomTable>
        <RoomTableRow>
          <CreateRoomInput onNameInputChange={onNameInputChange} />
        </RoomTableRow>
        <RoomTableRow>
          <CreateRoomPrivacy />
        </RoomTableRow>
      </RoomTable>
    </div>
  );
};

export default React.memo(CreateRoom);
