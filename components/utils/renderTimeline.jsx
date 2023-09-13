export const renderTimeline = ({ timelineData }) => {
  console.log("timelineData", timelineData);
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
                <CountUp start={0} end={unitsMadeThisHourA} /> /{" "}
                {unitsThisHour.timelineB.qty}
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
                qty={qtyA}
                totalQty={
                  totalUnitsByItem[unitsThisHour.timelineB.item]
                    ? totalUnitsByItem[unitsThisHour.timelineB.item].totalMade
                    : 0
                }
                message={"Units/Total: "}
                startingQty={
                  totalUnitsByItem[unitsThisHour.timelineB.item]
                    ? totalUnitsByItem[unitsThisHour.timelineB.item]
                        .totalRemaining + startingQtyA
                    : 0
                }
                percentage={
                  (startingQtyA / totalUnitsByItem[unitsThisHour.timelineB.item]
                    ? totalUnitsByItem[unitsThisHour.timelineB.item].totalMade
                    : 0) * 100
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
      ) : null}
    </div>
  );
};
