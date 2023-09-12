import React, { useState, useEffect } from "react";
import "./StatTracker.css"; // Import the CSS for styling
import RunningStatus from "./RunningStatus";
import ProgressBar from "./ProgressBar";
import CountUp from "react-countup";
import TimeAndWeather from "./TimeAndWeather";

const StatTracker = ({
  timelineA,
  timelineB,
  timelineC,
  dateAndTimeline,
  setUnitsThisHour,
  unitsThisHour,
}) => {
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
    <div className="stat-tracker h-52 flex flex-row justify-center border-3 border-white">
      {/* more data here - time?  weather? */}
      <div className="w-2/12">
        <TimeAndWeather />
      </div>
      <div className="flex flex-col w-1/3 mr-10">
        <div className="">
          {unitsThisHour.timelineB.product === "CIP" ? (
            <RunningStatus status="LINE A - OFFLINE" />
          ) : (
            <RunningStatus status="LINE A - RUNNING" />
          )}
        </div>
        {unitsThisHour.timelineB.product !== "CIP" ? (
          <div>
            {" "}
            <div className="flex flex-row mt-2 w-full ">
              <div className="stat-item">
                <p>Item Number: {unitsThisHour.timelineB.item}</p>
              </div>
              <div className="stat-item">
                <p>Item: {unitsThisHour.timelineB.product}</p>
              </div>
              <div className="w-9/12">
                <ProgressBar
                  qty={qtyA}
                  totalQty={unitsThisHour.timelineB.qty}
                  message={"Units/Hour: "}
                  startingQty={startingQtyA}
                />
                <div className="text-right text-sm mt-1">
                  Units Created This Hour:{" "}
                  <CountUp
                    start={unitsMadeThisHourA}
                    end={unitsMadeThisHourA}
                  />{" "}
                  / {unitsThisHour.timelineB.qty}
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="stat-item">
                <p>Units/Hour: {unitsThisHour.timelineB.qty}</p>
              </div>
              <div className="stat-item">
                <p>Total Units: {unitsThisHour.timelineB.totalQty}</p>
              </div>
              {/* search totalUnitsByItem for matching item number to timelineD.item and return totalMade and totalRemaining */}

              <div className="w-9/12 ml-5 ">
                <ProgressBar
                  qty={
                    totalUnitsByItem[unitsThisHour.timelineB.item]
                      ? totalUnitsByItem[unitsThisHour.timelineB.item]
                          .totalRemaining
                      : 0
                  }
                  totalQty={
                    totalUnitsByItem[unitsThisHour.timelineB.item]
                      ? totalUnitsByItem[unitsThisHour.timelineB.item].totalMade
                      : 0
                  }
                  message={"Units/Hour: "}
                  startingQty={
                    totalUnitsByItem[unitsThisHour.timelineB.item]
                      ? totalUnitsByItem[unitsThisHour.timelineB.item]
                          .totalRemaining + startingQtyA
                      : 0
                  }
                />
                <div className="text-right text-sm mt-1">
                  Total Units Created: <CountUp start={qtyA} end={qtyA} /> /{" "}
                  {totalUnitsByItem[unitsThisHour.timelineB.item]
                    ? totalUnitsByItem[unitsThisHour.timelineB.item].totalMade
                    : 0}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-2xl mt-5">
            CLEANING IN PROGRESS...
          </div>
        )}
      </div>

      <div className="flex flex-col w-1/3 mr-9">
        <div className="">
          {unitsThisHour.timelineC.product === "CIP" ? (
            <RunningStatus status="LINE B - OFFLINE" />
          ) : (
            <RunningStatus status="LINE B - RUNNING" />
          )}
        </div>
        {unitsThisHour.timelineC.product !== "CIP" ? (
          <div>
            {" "}
            <div className="flex flex-row mt-2 w-full ">
              <div className="stat-item">
                <p>Item Number: {unitsThisHour.timelineC.item}</p>
              </div>
              <div className="stat-item">
                <p>Item: {unitsThisHour.timelineC.product}</p>
              </div>
              <div className="w-9/12">
                <ProgressBar
                  qty={qtyB}
                  totalQty={unitsThisHour.timelineC.qty}
                  message={"Units/Hour: "}
                  startingQty={startingQtyB}
                />
                <div className="text-right text-sm mt-1">
                  Units Created This Hour:{" "}
                  <CountUp
                    start={unitsMadeThisHourB}
                    end={unitsMadeThisHourB}
                  />{" "}
                  / {unitsThisHour.timelineC.qty}
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="stat-item">
                <p>Units/Hour: {unitsThisHour.timelineC.qty}</p>
              </div>
              <div className="stat-item">
                <p>Total Units: {unitsThisHour.timelineC.totalQty}</p>
              </div>
              {/* search totalUnitsByItem for matching item number to timelineD.item and return totalMade and totalRemaining */}

              <div className="w-9/12 ml-5 ">
                <ProgressBar
                  qty={
                    totalUnitsByItem[unitsThisHour.timelineC.item]
                      ? totalUnitsByItem[unitsThisHour.timelineC.item]
                          .totalRemaining
                      : 0
                  }
                  totalQty={
                    totalUnitsByItem[unitsThisHour.timelineC.item]
                      ? totalUnitsByItem[unitsThisHour.timelineC.item].totalMade
                      : 0
                  }
                  message={"Units/Hour: "}
                  startingQty={
                    totalUnitsByItem[unitsThisHour.timelineC.item]
                      ? totalUnitsByItem[unitsThisHour.timelineC.item]
                          .totalRemaining + startingQtyB
                      : 0
                  }
                />
                <div className="text-right text-sm mt-1">
                  Total Units Created: <CountUp start={qtyB} end={qtyB} /> /{" "}
                  {totalUnitsByItem[unitsThisHour.timelineC.item]
                    ? totalUnitsByItem[unitsThisHour.timelineC.item].totalMade
                    : 0}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-2xl mt-5">
            CLEANING IN PROGRESS...
          </div>
        )}
      </div>

      <div className="flex flex-col w-1/3 ml-15">
        <div className="">
          {unitsThisHour.timelineD.product === "CIP" ? (
            <RunningStatus status="LINE C - OFFLINE" />
          ) : (
            <RunningStatus status="LINE C - RUNNING" />
          )}
        </div>
        {unitsThisHour.timelineD.product !== "CIP" ? (
          <div>
            {" "}
            <div className="flex flex-row mt-2 w-full ">
              <div className="stat-item">
                <p>Item Number: {unitsThisHour.timelineD.item}</p>
              </div>
              <div className="stat-item">
                <p>Item: {unitsThisHour.timelineD.product}</p>
              </div>
              <div className="w-9/12">
                <ProgressBar
                  qty={qtyC}
                  totalQty={unitsThisHour.timelineD.qty}
                  message={"Units/Hour: "}
                  startingQty={startingQtyC}
                />
                <div className="text-right text-sm mt-1">
                  Units Created This Hour:{" "}
                  <CountUp
                    start={unitsMadeThisHourC}
                    end={unitsMadeThisHourC}
                  />{" "}
                  / {unitsThisHour.timelineD.qty}
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <div className="stat-item">
                <p>Units/Hour: {unitsThisHour.timelineD.qty}</p>
              </div>
              <div className="stat-item">
                <p>Total Units: {unitsThisHour.timelineD.totalQty}</p>
              </div>

              <div className="w-9/12 ml-5 ">
                <ProgressBar
                  qty={
                    totalUnitsByItem[unitsThisHour.timelineD.item]
                      ? totalUnitsByItem[unitsThisHour.timelineD.item]
                          .totalRemaining
                      : 0
                  }
                  totalQty={
                    totalUnitsByItem[unitsThisHour.timelineD.item]
                      ? totalUnitsByItem[unitsThisHour.timelineD.item].totalMade
                      : 0
                  }
                  message={"Units/Hour: "}
                  startingQty={
                    totalUnitsByItem[unitsThisHour.timelineD.item]
                      ? totalUnitsByItem[unitsThisHour.timelineD.item]
                          .totalRemaining + startingQtyC
                      : 0
                  }
                />
                <div className="text-right text-sm mt-1">
                  Total Units Created: <CountUp start={qtyC} end={qtyC} /> /{" "}
                  {totalUnitsByItem[unitsThisHour.timelineD.item]
                    ? totalUnitsByItem[unitsThisHour.timelineD.item].totalMade
                    : 0}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-2xl mt-5">
            CLEANING IN PROGRESS...
          </div>
        )}
      </div>
    </div>
  );
};

export default StatTracker;
