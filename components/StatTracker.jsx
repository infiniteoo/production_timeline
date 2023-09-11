import React from "react";
import "./StatTracker.css"; // Import the CSS for styling

const StatTracker = () => {
  return (
    <div className="stat-tracker mb-10 h-40">
      {/* Content of the StatTracker */}
      {/* You can add any content or statistics you want to display */}
      <div className="stat-item">
        <h3>Total Items:</h3>
        <p>100</p>
      </div>
      <div className="stat-item">
        <h3>Total Quantity:</h3>
        <p>1000</p>
      </div>
      {/* Add more stat items as needed */}
    </div>
  );
};

export default StatTracker;
