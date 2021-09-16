import React from "react";
import "./Loader.css";

const Loader = (props) => {
  const { label } = props;
  return <span className="fetching-data">{label}</span>;
};

export default Loader;
