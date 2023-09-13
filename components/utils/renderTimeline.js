import ProgressBar from '../ProgressBar'
import CountUp from 'react-countup'
import { calculateTotalUnitsByItem } from './calculateTotalUnitsByItem'

export const renderTimeline = (
  timelineData,
  timelineA,
  timelineB,
  timelineC,
  startingQty,
  qty,
  unitsMadeThisHour,
) => {
  const totalUnitsByItem = calculateTotalUnitsByItem({
    timelineData: timelineData,
    timelineA: timelineA,
    timelineB: timelineB,
    timelineC: timelineC,

    // Assuming timelineA is the appropriate property
  })
  /* console.log('totalUnitsByItem', totalUnitsByItem) */

  if (timelineData.product === 'CIP') {
    return (
      <div className="text-center text-2xl mt-5">CLEANING IN PROGRESS...</div>
    )
  }

  return (
    <div>
      {timelineData.product !== 'CIP' ? (
        <div>
          {' '}
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
                message={'Units/Hour:'}
                startingQty={startingQty}
                percentage={(unitsMadeThisHour / timelineData.qty) * 100}
              />
              <div className="text-right text-sm mt-1">
                Units Created This Hour:{' '}
                <CountUp start={unitsMadeThisHour} end={unitsMadeThisHour} /> /{' '}
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

            <div className="w-9/12 ml-5 ">
              <ProgressBar
                qty={qty}
                totalQty={
                  totalUnitsByItem[timelineData.item]
                    ? totalUnitsByItem[timelineData.item].totalMade
                    : 0
                }
                message={'Units/Total: '}
                percentage={
                  totalUnitsByItem[timelineData.item]
                    ? (qty / totalUnitsByItem[timelineData.item].totalMade) *
                      100
                    : 0
                }
              />
              <div className="text-right text-sm mt-1">
                Total Units Created:{' '}
                <CountUp
                  start={
                    totalUnitsByItem[timelineData.item]
                      ? totalUnitsByItem[timelineData.item].totalMade
                      : qty
                  }
                  end={
                    totalUnitsByItem[timelineData.item]
                      ? totalUnitsByItem[timelineData.item].totalMade
                      : qty
                  }
                />{' '}
                /{' '}
                {totalUnitsByItem[timelineData.item]
                  ? totalUnitsByItem[timelineData.item].totalToBeCreated
                  : 0}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
