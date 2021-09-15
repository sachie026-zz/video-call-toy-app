import React from "react";

import BackButton from "../../components/BackButton";
import "./Dashboard.css";

const DashboardHeader = (props) => {
  const { selectedRoomIndex, goBack, selectedRoomName } = props;

  return (
    <>
      {selectedRoomIndex !== null ? (
        <>
          <BackButton previous="Rooms" goBack={goBack} />
          <span className="participants-label">{`${selectedRoomName} participants`}</span>
        </>
      ) : (
        <div className="room-label">Your rooms</div>
      )}
    </>
  );
};

export default React.memo(DashboardHeader);
