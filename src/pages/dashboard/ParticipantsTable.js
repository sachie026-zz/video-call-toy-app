import React from "react";

import Table from "./Table/Table";
import TableHeader from "./Table/TableHeader";
import TableRow from "./Table/TableRow";
import "./Dashboard.css";

const ParticipantsTable = (props) => {
  const { participants, onFirstColumnClick } = props;

  const onShowMetrics = () => {};

  return (
    <Table>
      <TableHeader columns={["User id"]} compkey="participant"/>
      {participants.map((participant, index) => (
        <TableRow
          columns={[participant.userid, ""]}
          key={`participant${index}`}
          rowKey={`participants${index}`}
          index={index}
          onFirstColumnClick={onFirstColumnClick}
          onShowMetrics={onShowMetrics}
        />
      ))}
      {participants.length === 0 ? (
        <TableRow columns={["", "No participants"]} key="roomnodata" />
      ) : null}
    </Table>
  );
};

export default React.memo(ParticipantsTable);
