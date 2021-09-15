import React from "react";
import "./BackButton.css";

const BackButton = (props) => {
  const { previous, goBack } = props;
  
  return (
    <span className="back-button" onClick={goBack}>{`${previous}  >  `}</span>
  );
};

export default React.memo(BackButton);
