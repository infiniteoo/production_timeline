export const calculateTotalUnitsByItem = ({
  timelineData,
  timelineA,
  timelineB,
  timelineC,
}) => {
  const totalUnitsByItem = {}
  const currentTime = new Date() // Get the current date and time
  let currentItemId = null // Initialize the current item ID
  let inCurrentRun = false // Flag to indicate if we're in the current run

  const myTimelines = [timelineA, timelineB, timelineC]

  if (timelineA && timelineB && timelineC) {
    // Iterate through each timeline separately
    myTimelines.forEach((timeline) => {
      timeline.forEach((row, index, arr) => {
        for (const key in timelineData) {
          const timelineItem = timelineData[key]
          const rowDate = new Date(row[0]) // Assuming the date is in the 1st column
          const rowTime = row[1] // Assuming the time is in the 2nd column
          const item = row[3] // Assuming the item is in the 4th column
          const qty = row[5] // Assuming the quantity is in the 6th column

          // Check if the row's date is before or equal to the current date
          // and the row's time is before or equal to the current time
          if (
            rowDate <= currentTime &&
            rowTime <= currentTime.toLocaleTimeString()
          ) {
            // If we're not in the current run and a new run is starting, stop counting
            if (!inCurrentRun && item !== currentItemId) {
              inCurrentRun = true
            }

            // If we're in the current run, update the totals
            if (inCurrentRun) {
              // Initialize the total for this item if it doesn't exist
              if (!totalUnitsByItem[item]) {
                totalUnitsByItem[item] = {
                  totalMade: 0,
                  totalRemaining: 0,
                  instances: [], // Initialize instances array
                }
              }

              // Check if the item has changed
              if (currentItemId !== item) {
                // Reset the totalMade and totalRemaining when a new item is encountered
                totalUnitsByItem[item].totalMade = 0
                totalUnitsByItem[item].totalRemaining = 0
                currentItemId = item
              }

              // Add the quantity to the total made for this item
              totalUnitsByItem[item].totalMade += qty

              // Look ahead in the timeline for the same item and accumulate totalRemaining
              const instances = [row] // Initialize instances array with the current row
              for (let i = index + 1; i < arr.length; i++) {
                const nextRow = arr[i]
                const nextItem = nextRow[3]
                if (nextItem === item) {
                  totalUnitsByItem[item].totalRemaining += nextRow[5]
                  instances.push(nextRow) // Add matching rows to instances
                } else {
                  break // Stop when a different item is encountered
                }
              }

              totalUnitsByItem[item].instances = instances // Store instances in the object
            }
          }
        }
      })
    })
  }

  // Calculate totalToBeCreated based on totalMade and totalRemaining
  for (const item in totalUnitsByItem) {
    const { totalMade, totalRemaining } = totalUnitsByItem[item]
    totalUnitsByItem[item].totalToBeCreated = totalMade + totalRemaining
  }

  return totalUnitsByItem
}
