import React from "react";
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
  return (
    <div className="stat-tracker mb-10 h-40 flex flex-row justify-center pl-40">
      <div className="flex flex-col w-1/3 mr-10">
        <div className="">
          <RunningStatus status={"LINE A - RUNNING"} />
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
              qty={unitsThisHour.timelineB.qty}
              totalQty={unitsThisHour.timelineB.totalQty}
              message={"Units/Hour: "}
            />
            <div className="mt-1">
              <ProgressBar
                qty={unitsThisHour.timelineB.qty}
                totalQty={unitsThisHour.timelineB.totalQty}
                message={"Units/Total: "}
              />
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
          <RunningStatus status={"LINE B - RUNNING"} />
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
              qty={unitsThisHour.timelineC.qty}
              totalQty={unitsThisHour.timelineC.totalQty}
              message={"Units/Hour: "}
            />
            <div className="mt-1">
              <ProgressBar
                qty={unitsThisHour.timelineC.qty}
                totalQty={unitsThisHour.timelineC.totalQty}
                message={"Units/Total: "}
              />
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
          <RunningStatus status={"LINE C - RUNNING"} />
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
              qty={unitsThisHour.timelineD.qty}
              totalQty={unitsThisHour.timelineD.totalQty}
              message={"Units/Hour: "}
            />
            <div className="mt-1">
              <ProgressBar
                qty={unitsThisHour.timelineD.qty}
                totalQty={unitsThisHour.timelineD.totalQty}
                message={"Units/Total: "}
              />
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
