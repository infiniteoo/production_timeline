import React, { useState, useEffect } from "react";
import axios from "axios";

const DataReader = () => {
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    // Make an Axios GET request to fetch the Excel data
    axios
      .get("http://localhost:5000/api/excel")
      .then((response) => {
        console.log("Excel data:", response.data);
        setExcelData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the Excel data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Excel Data</h2>
      <table>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            {/* Add more columns as needed */}
          </tr>
        </thead>
        <tbody>
          {excelData.map((row, index) => (
            <tr key={index}>
              <td>{row["Column 1"]}</td>
              <td>{row["Column 2"]}</td>
              {/* Render more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataReader;
