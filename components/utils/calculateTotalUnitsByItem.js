export const calculateTotalUnitsByItem = ({
  timelineA,
  timelineB,
  timelineC,
}) => {
  const totalUnitsByItem = {}
  const currentTime = new Date() // Get the current date and time
  console.log('timelineA', timelineA)
  console.log('timelineB', timelineB)
  console.log('timelineC', timelineC)

  let currentItemId = null // Initialize the current item ID

  // Iterate through timelineA, timelineB, and timelineC
  ;[timelineA, timelineB, timelineC].forEach((timeline) => {
    timeline.forEach((row) => {
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
        // Initialize the total for this item if it doesn't exist
        if (!totalUnitsByItem[item]) {
          totalUnitsByItem[item] = {
            totalMade: 0,
            totalRemaining: 0,
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
      } else {
        // The row's date and time are in the future, so add the quantity to total remaining
        if (!totalUnitsByItem[item]) {
          totalUnitsByItem[item] = {
            totalMade: 0,
            totalRemaining: 0,
          }
        }

        // Check if the item has changed
        if (currentItemId !== item) {
          // Reset the totalMade and totalRemaining when a new item is encountered
          totalUnitsByItem[item].totalMade = 0
          totalUnitsByItem[item].totalRemaining = 0
          currentItemId = item
        }

        totalUnitsByItem[item].totalRemaining += qty
      }
    })
  })

  return totalUnitsByItem
}
