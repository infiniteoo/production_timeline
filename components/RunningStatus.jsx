import React from "react";
import "./RunningStatus.css"; // You can create a CSS file for styling

function RunningStatus({ status }) {
  return <div className="running-box">{status}</div>;
}

export default RunningStatus;
