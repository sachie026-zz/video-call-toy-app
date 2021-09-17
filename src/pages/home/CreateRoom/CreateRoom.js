import React from "react";

import CreateRoomTable from "./CreateRoomTable";
import CreateRoomTableRow from "./CreateRoomTableRow";
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
      <CreateRoomTable>
        <CreateRoomTableRow>
          <CreateRoomInput onNameInputChange={onNameInputChange} />
        </CreateRoomTableRow>
        <CreateRoomTableRow>
          <CreateRoomPrivacy />
        </CreateRoomTableRow>
      </CreateRoomTable>
    </div>
  );
};

export default React.memo(CreateRoom);
