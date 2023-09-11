import React, { useState, useEffect } from "react";
import axios from "axios";

const DataReader = ({
  setTimelineA,
  setTimelineB,
  setTimelineC,
  setDateAndTimeline,
}) => {
  useEffect(() => {
    // Convert entry 0 (date) into a readable date format

    // Make an Axios GET request to fetch the Excel data
    axios
      .get("http://localhost:5000/api/excel")
      .then(({ data }) => {
        // Distribute data to timelines A, B, or C based on your logic
        const updatedTimelineA = [];
        const updatedTimelineB = [];
        const updatedTimelineC = [];
        const updatedDateAndTimeline = [];

        data.forEach((row, index) => {
          // Convert entry 0 (date) into a readable date format
          const excelEpoch = new Date(Date.UTC(1899, 11, 31)); // Excel epoch is January 1, 1900
          const dateValue = new Date(
            excelEpoch.getTime() + row[0] * 24 * 60 * 60 * 1000
          ).toLocaleDateString();

          // Convert entry 1 (time) into a time format
          const timeValue = new Date(row[1] * 24 * 60 * 60 * 1000)
            .toUTCString()
            .split(" ")[4];

          // Create an array with the updated values
          const updatedRow = [dateValue, timeValue, ...row.slice(2)];

          const dateAndTimelineEntry = updatedRow.slice(0, 2); // Entries 0-5

          const entryA = [...updatedRow.slice(0, 6)]; // Entries 0-5
          const entryB = [
            ...updatedRow.slice(0, 3),
            ...updatedRow.slice(7, 10),
          ]; // Entries 0-2 and 7-9
          const entryC = [
            ...updatedRow.slice(0, 3),
            ...updatedRow.slice(11, 14),
          ]; // Entries 0-2 and 11-13

          updatedDateAndTimeline.push(dateAndTimelineEntry);
          updatedTimelineA.push(entryA);
          updatedTimelineB.push(entryB);
          updatedTimelineC.push(entryC);
        });

        setTimelineA(updatedTimelineA);
        setTimelineB(updatedTimelineB);
        setTimelineC(updatedTimelineC);
        setDateAndTimeline(updatedDateAndTimeline);

        // log all three timelines
      })
      .catch((error) => {
        console.error("Error fetching the Excel data:", error);
      });
  }, []);

  return <div></div>;
};

export default DataReader;
