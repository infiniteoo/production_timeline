import React, { useState, useEffect } from "react";
import "./StatTracker.css"; // Import the CSS for styling
import RunningStatus from "./RunningStatus";
import ProgressBar from "./ProgressBar";
import CountUp from "react-countup";
import TimeAndWeather from "./TimeAndWeather";

const StatTracker = ({ timelineA, timelineB, timelineC, unitsThisHour }) => {
  // Create state variables to track the qty for each line
  const [qtyA, setQtyA] = useState(unitsThisHour.timelineB.qty);
  const [qtyB, setQtyB] = useState(unitsThisHour.timelineC.qty);
  const [qtyC, setQtyC] = useState(unitsThisHour.timelineD.qty);

  // Calculate units per second (units per hour / 3600)

  // Calculate the progress of the hour that has already passed
  const now = new Date();
  const minutesPassed = now.getMinutes();
  const secondsPassed = minutesPassed * 60 + now.getSeconds();
  const remainingMinutes = 60 - minutesPassed;
  const remainingSeconds = remainingMinutes * 60;

  const unitsPerHourA = unitsThisHour.timelineB.qty;
  const unitsPerHourB = unitsThisHour.timelineC.qty;
  const unitsPerHourC = unitsThisHour.timelineD.qty;

  const unitsPerSecondA = unitsPerHourA / remainingSeconds;
  const unitsPerSecondB = unitsPerHourB / remainingSeconds;
  const unitsPerSecondC = unitsPerHourC / remainingSeconds;

  const startingQtyA = qtyA - unitsPerSecondA * secondsPassed;
  const startingQtyB = qtyB - unitsPerSecondB * secondsPassed;
  const startingQtyC = qtyC - unitsPerSecondC * secondsPassed;

  const unitsMadeThisHourA = qtyA - startingQtyA;
  const unitsMadeThisHourB = qtyB - startingQtyB;
  const unitsMadeThisHourC = qtyC - startingQtyC;

  // Update the qty every second for each line
  useEffect(() => {
    // Calculate the interval based on unitsPerSecond
    const intervalA = setInterval(() => {
      setQtyA((prevQty) => prevQty + unitsPerSecondA);
      console.log("qtyA", qtyA);
    }, 1000);

    const intervalB = setInterval(() => {
      setQtyB((prevQty) => prevQty + unitsPerSecondB);
    }, 1000);

    const intervalC = setInterval(() => {
      setQtyC((prevQty) => prevQty + unitsPerSecondC);
    }, 1000);

    // Clear the intervals when the component unmounts
    return () => {
      clearInterval(intervalA);
      clearInterval(intervalB);
      clearInterval(intervalC);
    };
  }, [unitsPerSecondA, unitsPerSecondB, unitsPerSecondC]);

  useEffect(() => {}, [
    unitsMadeThisHourA,
    unitsMadeThisHourB,
    unitsMadeThisHourC,
  ]);

  const renderTimeline = (
    timelineData,
    startingQty,
    qty,
    unitsMadeThisHour
  ) => {
    if (timelineData.product === "CIP") {
      return (
        <div className="text-center text-2xl mt-5">CLEANING IN PROGRESS...</div>
      );
    }

    return (
      <div>
        {unitsThisHour.timelineB.product !== "CIP" ? (
          <div>
            {" "}
            <div className="flex flex-row mt-2 w-full ">
              <div className="stat-item">
                <p>Item Number: {timelineData.item}</p>
              </div>
              <div className="stat-item">
                <p>Item: {timelineData.product}</p>
              </div>
              <div className="w-9/12">
                <ProgressBar
                  qty={qty}
                  totalQty={timelineData.qty}
                  message={"Units/Hour: "}
                  startingQty={startingQty}
                  percentage={
                    (qtyA / startingQty / timelineData.totalQty) * 100
                  }
                />
                <div className="text-right text-sm mt-1">
                  Units Created This Hour:{" "}
                  <CountUp start={0} end={unitsMadeThisHour} /> /{" "}
                  {timelineData.qty}
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="stat-item">
                <p>Units/Hour: {timelineData.qty}</p>
              </div>
              <div className="stat-item">
                <p>Total Units: {timelineData.totalQty}</p>
              </div>
              {/* search totalUnitsByItem for matching item number to timelineD.item and return totalMade and totalRemaining */}

              <div className="w-9/12 ml-5 ">
                <ProgressBar
                  qty={qty}
                  totalQty={
                    totalUnitsByItem[timelineData.item]
                      ? totalUnitsByItem[timelineData.item].totalMade
                      : 0
                  }
                  message={"Units/Total: "}
                  startingQty={
                    totalUnitsByItem[timelineData.item]
                      ? totalUnitsByItem[timelineData.item].totalRemaining +
                        startingQty
                      : 0
                  }
                  percentage={
                    (startingQty / totalUnitsByItem[timelineData.item]
                      ? totalUnitsByItem[timelineData.item].totalMade
                      : 0) * 100
                  }
                />
                <div className="text-right text-sm mt-1">
                  Total Units Created: <CountUp start={qty} end={qty} /> /{" "}
                  {totalUnitsByItem[timelineData.item]
                    ? totalUnitsByItem[timelineData.item].totalMade
                    : 0}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  };

  // log all these values to the console

  const calculateTotalUnitsByItem = () => {
    const totalUnitsByItem = {};
    const currentTime = new Date(); // Get the current date and time

    let currentItemId = null; // Initialize the current item ID

    // Iterate through timelineA, timelineB, and timelineC
    [timelineA, timelineB, timelineC].forEach((timeline) => {
      timeline.forEach((row) => {
        const rowDate = new Date(row[0]); // Assuming the date is in the 1st column
        const rowTime = row[1]; // Assuming the time is in the 2nd column
        const item = row[3]; // Assuming the item is in the 4th column
        const qty = row[5]; // Assuming the quantity is in the 6th column

        // Check if the row's date is before or equal to the current date
        // and the row's time is before or equal to the current time
        if (
          rowDate <= currentTime &&
          rowTime <= currentTime.toLocaleTimeString()
        ) {
          // Initialize the total for this item if it doesn't exist
          if (!totalUnitsByItem[item]) {
            totalUnitsByItem[item] = {
              totalMade: 0,
              totalRemaining: 0,
            };
          }

          // Check if the item has changed
          if (currentItemId !== item) {
            // Reset the totalMade and totalRemaining when a new item is encountered
            totalUnitsByItem[item].totalMade = 0;
            totalUnitsByItem[item].totalRemaining = 0;
            currentItemId = item;
          }

          // Add the quantity to the total made for this item
          totalUnitsByItem[item].totalMade += qty;
        } else {
          // The row's date and time are in the future, so add the quantity to total remaining
          if (!totalUnitsByItem[item]) {
            totalUnitsByItem[item] = {
              totalMade: 0,
              totalRemaining: 0,
            };
          }

          // Check if the item has changed
          if (currentItemId !== item) {
            // Reset the totalMade and totalRemaining when a new item is encountered
            totalUnitsByItem[item].totalMade = 0;
            totalUnitsByItem[item].totalRemaining = 0;
            currentItemId = item;
          }

          totalUnitsByItem[item].totalRemaining += qty;
        }
      });
    });

    return totalUnitsByItem;
  };

  // Call the function to get the total units by item
  const totalUnitsByItem = calculateTotalUnitsByItem();
  console.log(totalUnitsByItem);

  return (
    <div className="stat-tracker flex flex-row justify-center border-3 border-white">
      <div className="w-2/12">
        <TimeAndWeather />
      </div>

      {/* Render Line A */}
      <div className="flex flex-col w-1/3 mr-10">
        <RunningStatus
          status={
            unitsThisHour.timelineB.product === "CIP"
              ? "LINE A - OFFLINE"
              : "LINE A - RUNNING"
          }
        />
        {renderTimeline(
          unitsThisHour.timelineB,
          startingQtyA,
          qtyA,
          unitsMadeThisHourA
        )}
      </div>

      {/* Render Line B */}
      <div className="flex flex-col w-1/3 mr-9">
        <RunningStatus
          status={
            unitsThisHour.timelineC.product === "CIP"
              ? "LINE B - OFFLINE"
              : "LINE B - RUNNING"
          }
        />
        {renderTimeline(
          unitsThisHour.timelineC,
          startingQtyB,
          qtyB,
          unitsMadeThisHourB
        )}
      </div>

      {/* Render Line C */}
      <div className="flex flex-col w-1/3 ml-15">
        <RunningStatus
          status={
            unitsThisHour.timelineD.product === "CIP"
              ? "LINE C - OFFLINE"
              : "LINE C - RUNNING"
          }
        />
        {renderTimeline(
          unitsThisHour.timelineD,
          startingQtyC,
          qtyC,
          unitsMadeThisHourC
        )}
      </div>
    </div>
  );
};

export default StatTracker;
