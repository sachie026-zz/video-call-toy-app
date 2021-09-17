import React from "react";

import Table from "./Table/Table";
import TableHeader from "./Table/TableHeader";
import TableRow from "./Table/TableRow";
import "./Dashboard.css";

const participantsColumns = ["User id"];
const noParticipantsColumns = ["", "No participants"];

const ParticipantsTable = (props) => {
  const { participants, onFirstColumnClick } = props;

  return (
    <Table>
      <TableHeader columns={participantsColumns} compkey="participant" />
      {participants.map((participant, index) => (
        <TableRow
          columns={[participant.userid, ""]}
          key={`participant${index}`}
          rowKey={`participants${index}`}
          index={index}
          onFirstColumnClick={onFirstColumnClick}
        />
      ))}
      {participants.length === 0 ? (
        <TableRow columns={noParticipantsColumns} key="noparticipantsdata" />
      ) : null}
    </Table>
  );
};

export default React.memo(ParticipantsTable);
