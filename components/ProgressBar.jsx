import React from "react";
import "./ProgressBar.css"; // You can create a CSS file for styling

function ProgressBar({ qty, totalQty, message, startingQty }) {
  console.log("starting qty", startingQty);
  console.log("total qty", totalQty);
  // Calculate the percentage of completion
  const percentage = (startingQty / totalQty) * 100;
  /*   console.log(
    "in progress bar, qty, totalqty, message",
    qty,
    totalQty,
    message
  ); */

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${percentage}%` }}>
        <div className="flex flex-row justify-start">
          <div className="progress-text">{`${message} `}</div>
          <div className="progress-text">{`${percentage.toFixed(2)}% `}</div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
