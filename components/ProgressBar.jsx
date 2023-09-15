import React from "react";
import "./ProgressBar.css"; // You can create a CSS file for styling
import dynamicCounter from "./DynamicCounter";

function ProgressBar({ message, percentage, totalQty }) {
  // const [progress, setProgress] = useState(0);

  console.log(dynamicCounter(totalQty));

  let progress = dynamicCounter(totalQty);

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: progress[0] }}>
        <div className="flex flex-row justify-start">
          <div className="progress-text ml-2">{`${message} `}</div>
          <div className="progress-text">{progress[0].toFixed(2)}%</div>
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
