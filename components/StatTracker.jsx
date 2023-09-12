import React, { useState, useEffect } from "react";
import "./StatTracker.css"; // Import the CSS for styling
import RunningStatus from "./RunningStatus";
import ProgressBar from "./ProgressBar";
import CountUp from "react-countup";

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
    }, 1000 / unitsPerSecondA);

    const intervalB = setInterval(() => {
      setQtyB((prevQty) => prevQty + unitsPerSecondB);
    }, 1000 / unitsPerSecondB);

    const intervalC = setInterval(() => {
      setQtyC((prevQty) => prevQty + unitsPerSecondC);
    }, 1000 / unitsPerSecondC);

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

    // Iterate through timelineA, timelineB, and timelineC
    [timelineA, timelineB, timelineC].forEach((timeline) => {
      timeline.forEach((row) => {
        const item = row[3]; // Assuming the item is in the 4th column, adjust as needed
        const qty = row[5]; // Assuming the quantity is in the 6th column, adjust as needed

        // Initialize the total for this item if it doesn't exist
        if (!totalUnitsByItem[item]) {
          totalUnitsByItem[item] = 0;
        }

        // Add the quantity to the total for this item
        totalUnitsByItem[item] += qty;
      });
    });

    return totalUnitsByItem;
  };

  // Call the function to get the total units by item
  // const totalUnitsByItem = calculateTotalUnitsByItem();

  return (
    <div className="stat-tracker h-52 flex flex-row justify-center border-3 border-white">
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
            <div className="flex flex-row mt-2 w-full">
              <div className="stat-item">
                <p>Item Number: {unitsThisHour.timelineB.item}</p>
              </div>
              <div className="stat-item">
                <p>Item: {unitsThisHour.timelineB.product}</p>
              </div>
              <div className="w-9/12 mt-1">
                <ProgressBar
                  qty={qtyA}
                  totalQty={unitsThisHour.timelineB.qty}
                  message={"Units/Hour: "}
                  startingQty={startingQtyA}
                />
                <div className="text-right text-lg mt-1">
                  Units Created This Hour:{" "}
                  <CountUp
                    start={unitsMadeThisHourA}
                    end={unitsMadeThisHourA}
                  />{" "}
                  / {unitsThisHour.timelineB.qty}
                </div>
              </div>
            </div>
            <div className="">
              <div className="stat-item">
                <p className="">Units/Hour: {unitsThisHour.timelineB.qty}</p>
              </div>
              <div className="stat-item">
                <p>Total Units: {unitsThisHour.timelineB.totalQty}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-2xl mt-5">
            CLEANING IN PROGRESS...
          </div>
        )}
      </div>

      <div className="flex flex-col w-1/3 mr-10 ">
        <div className="">
          {unitsThisHour.timelineC.product === "CIP" ? (
            <RunningStatus status="LINE B - OFFLINE" />
          ) : (
            <RunningStatus status="LINE B - RUNNING" />
          )}
        </div>
        {unitsThisHour.timelineC.product !== "CIP" ? (
          <div>
            <div className="flex flex-row mt-2 w-full">
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
                <div className="text-right text-lg mt-1">
                  Units Created This Hour:{" "}
                  <CountUp
                    start={unitsMadeThisHourB}
                    end={unitsMadeThisHourB}
                  />{" "}
                  / {unitsThisHour.timelineC.qty}
                </div>
              </div>
            </div>
            <div className="">
              <div className="stat-item">
                <p>Units/Hour: {unitsThisHour.timelineC.qty}</p>
              </div>
              <div className="stat-item">
                <p>Total Units: {unitsThisHour.timelineC.totalQty}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-2xl mt-5">
            CLEANING IN PROGRESS...
          </div>
        )}
      </div>

      <div className="flex flex-col w-1/3 mr-10">
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
                <div className="text-right text-lg mt-1">
                  Units Created This Hour:{" "}
                  <CountUp
                    start={unitsMadeThisHourC}
                    end={unitsMadeThisHourC}
                  />{" "}
                  / {unitsThisHour.timelineD.qty}
                </div>
              </div>
            </div>
            <div className="">
              <div className="stat-item">
                <p>Units/Hour: {unitsThisHour.timelineD.qty}</p>
              </div>
              <div className="stat-item">
                <p>Total Units: {unitsThisHour.timelineD.totalQty}</p>
              </div>
              <div className="text-right text-xl">
                Total Units This Hour:{" "}
                <CountUp start={unitsMadeThisHourC} end={unitsMadeThisHourC} />{" "}
                / {unitsThisHour.timelineD.qty}
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
