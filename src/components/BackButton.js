import React from "react";

const BackButton = (props) => {
  const { previous } = props;
  return <span>{`${previous} > `}</span>;
};

export default BackButton;
