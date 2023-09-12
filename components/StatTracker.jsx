import React, { useState, useEffect } from "react";
import "./StatTracker.css"; // Import the CSS for styling
import RunningStatus from "./RunningStatus";
import ProgressBar from "./ProgressBar";

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
  const secondsPassed = now.getMinutes() * 60 + now.getSeconds();
  const remainingSeconds = 3600 - secondsPassed;

  const unitsPerSecondA = unitsThisHour.timelineB.qty / remainingSeconds;
  const unitsPerSecondB = unitsThisHour.timelineC.qty / remainingSeconds;
  const unitsPerSecondC = unitsThisHour.timelineD.qty / remainingSeconds;

  const startingQtyA = qtyA - secondsPassed * unitsPerSecondA;
  const startingQtyB = qtyB - secondsPassed * unitsPerSecondB;
  const startingQtyC = qtyC - secondsPassed * unitsPerSecondC;

  // Update the qty every second for each line
  useEffect(() => {
    const intervalA = setInterval(() => {
      setQtyA((prevQty) => prevQty + unitsPerSecondA);
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

  // log all these values to the console

  return (
    <div className="stat-tracker mb-3 h-40 flex flex-row justify-center pl-40">
      <div className="flex flex-col w-1/3 mr-10">
        <div className="">
          {unitsThisHour.timelineB.product === "CIP" ? (
            <RunningStatus status="LINE A - OFFLINE" />
          ) : (
            <RunningStatus status="LINE A - RUNNING" />
          )}
        </div>
        <div className="flex flex-row mt-2 w-full">
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
            <div className="mt-1">
              {/*  <ProgressBar
                qty={unitsThisHour.timelineB.qty}
                totalQty={unitsThisHour.timelineB.totalQty}
                message={"Units/Total: "}
                startingQty={startingQtyA}
              /> */}
            </div>
          </div>
        </div>
        <div className="">
          <div className="stat-item">
            <p>Units/Hour: {unitsThisHour.timelineB.qty}</p>
          </div>
          <div className="stat-item">
            <p>Total Units: {unitsThisHour.timelineB.totalQty}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-1/3 mr-10 ">
        <div className="">
          {unitsThisHour.timelineC.product === "CIP" ? (
            <RunningStatus status="LINE B - OFFLINE" />
          ) : (
            <RunningStatus status="LINE B - RUNNING" />
          )}
        </div>
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
            <div className="mt-1">
              {/*  <ProgressBar
                qty={unitsThisHour.timelineC.qty}
                totalQty={unitsThisHour.timelineC.totalQty}
                message={"Units/Total: "}
                startingQty={startingQtyB}
              /> */}
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

      <div className="flex flex-col w-1/3 mr-10">
        <div className="">
          {unitsThisHour.timelineD.product === "CIP" ? (
            <RunningStatus status="LINE C - OFFLINE" />
          ) : (
            <RunningStatus status="LINE C - RUNNING" />
          )}
        </div>
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
            <div className="mt-1">
              {/*  <ProgressBar
                qty={unitsThisHour.timelineD.qty}
                totalQty={unitsThisHour.timelineD.totalQty}
                message={"Units/Total: "}
                startingQty={startingQtyC}
              /> */}
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
        </div>
      </div>
    </div>
  );
};

export default StatTracker;
