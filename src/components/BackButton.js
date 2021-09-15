import React from "react";
import "./BackButton.css";

const BackButton = (props) => {
  const { goBack } = props;

  return (
    <span className="back-button" onClick={goBack}>
      Go back &nbsp;
    </span>
  );
};

export default React.memo(BackButton);
