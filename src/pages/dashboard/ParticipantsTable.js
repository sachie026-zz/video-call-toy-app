import React from "react";
import "./Dashboard.css";
import Table from "./Table";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";

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

export default ParticipantsTable;
