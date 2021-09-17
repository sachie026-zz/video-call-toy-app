import React from "react";

const CreateRoomPrivacy = () => {
  return (
    <>
      <div className="new-room-table-column">
        <span>Privacy</span>
        <span>Limit who can access the room</span>
      </div>
      <div className="new-room-radio">
        <input type="radio" defaultChecked />
        <span className="privacy-label">
          Public: anyone with the link can join
        </span>
      </div>
    </>
  );
};

export default React.memo(CreateRoomPrivacy);
