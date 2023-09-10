import React, { useState, useEffect } from "react";
import axios from "axios";

const DataReader = () => {
  const [timelineA, setTimelineA] = useState([]);
  const [timelineB, setTimelineB] = useState([]);
  const [timelineC, setTimelineC] = useState([]);

  useEffect(() => {
    // Make an Axios GET request to fetch the Excel data
    axios
      .get("http://localhost:5000/api/excel")
      .then(({ data }) => {
        // Distribute data to timelines A, B, or C based on your logic
        const updatedTimelineA = [];
        const updatedTimelineB = [];
        const updatedTimelineC = [];

        data.forEach((row, index) => {
          const entryA = row.slice(0, 6); // Entries 0-5
          const entryB = [...row.slice(0, 3), ...row.slice(7, 10)]; // Entries 0-2 and 7-9
          const entryC = [...row.slice(0, 3), ...row.slice(11, 14)]; // Entries 0-2 and 11-13

          updatedTimelineA.push(entryA);
          updatedTimelineB.push(entryB);
          updatedTimelineC.push(entryC);
        });

        setTimelineA(updatedTimelineA);
        setTimelineB(updatedTimelineB);
        setTimelineC(updatedTimelineC);

        // log all three updated timelines
        console.log("Timeline A:", updatedTimelineA);
        console.log("Timeline B:", updatedTimelineB);
        console.log("Timeline C:", updatedTimelineC);
      })
      .catch((error) => {
        console.error("Error fetching the Excel data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Excel Data</h2>
      <h3>Timeline A</h3>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {timelineA.map((row, index) => (
            <tr key={index}>
              {row.map((entry, entryIndex) => (
                <td key={entryIndex}>{entry}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Timeline B</h3>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {timelineB.map((row, index) => (
            <tr key={index}>
              {row.map((entry, entryIndex) => (
                <td key={entryIndex}>{entry}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Timeline C</h3>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {timelineC.map((row, index) => (
            <tr key={index}>
              {row.map((entry, entryIndex) => (
                <td key={entryIndex}>{entry}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataReader;
