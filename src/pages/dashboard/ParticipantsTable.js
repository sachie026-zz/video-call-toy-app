import React from "react";

import Table from "./Table/Table";
import TableHeader from "./Table/TableHeader";
import TableRow from "./Table/TableRow";
import "./Dashboard.css";

const ParticipantsTable = (props) => {
  const { participants } = props;

  return (
    <Table>
      <TableHeader columns={["User id"]} />
      {participants.map((participant, index) => (
        <TableRow columns={[participant.userid, '']} key={`participants${index}`} />
      ))}
      {participants.length === 0 ? (
        <TableRow columns={["", "No participants"]} key="roomnodata" />
      ) : null}
    </Table>
  );
};

export default React.memo(ParticipantsTable);
