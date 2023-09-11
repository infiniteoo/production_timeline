import React, { useState, useEffect, useRef } from "react";
import StatTracker from "./StatTracker";

const ProductionTable = ({
  timelineA,
  timelineB,
  timelineC,
  dateAndTimeline,
}) => {
  // Create a ref to store the matched row element
  const matchedRowRef = useRef(null);

  // create a state that keeps track of what product, item number and quantity is being produced on each of the three timelines
  const [unitsThisHour, setUnitsThisHour] = useState({
    timelineA: { item: 123456, product: "placeholder", qty: 123 },
    timelineB: { item: 123456, product: "placeholder", qty: 123 },
    timelineC: { item: 123456, product: "placeholder", qty: 123 },
    timelineD: { item: 123456, product: "placeholder", qty: 123 },
  });

  // define current hour
  const currentHour =
    new Date().getHours().toString().padStart(2, "0") + ":00:00";

  // define fake date as 08/29/2023
  const fakeDate = new Date(2023, 7, 29);

  // create useeffect on component start

  useEffect(() => {
    const updatedUnitsThisHour = { ...unitsThisHour };
    const tables = [dateAndTimeline, timelineA, timelineB, timelineC];

    tables.forEach((table, tableIndex) => {
      let totalQty = 0; // Initialize the total quantity for this timeline

      table.forEach((row, rowIndex) => {
        const rowDate = new Date(row[0]);

        if (
          rowDate.toDateString() === fakeDate.toDateString() &&
          row[1] === currentHour
        ) {
          // Apply a class to highlight the matching row
          const trElements = document.querySelectorAll(
            `.table-row-${rowIndex}`
          );
          trElements.forEach((trElement) => {
            trElement.classList.add("font-bold");
            trElement.classList.add("bg-green-200");
          });
          // Store the matched row element in the ref
          matchedRowRef.current = trElements[0];
          // Scroll to the matched row element and center it
          if (matchedRowRef.current) {
            matchedRowRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }

          // Update the total quantity for this timeline
          totalQty += row[5];

          // Set the values in the unitsThisHour state based on the current timeline
          updatedUnitsThisHour[
            `timeline${String.fromCharCode(65 + tableIndex)}`
          ] = {
            item: row[3],
            product: row[4],
            qty: row[5],
            totalQty, // Add the totalQty to the state
          };

          console.log(updatedUnitsThisHour);
        }
      });

      const myTables = [timelineA, timelineB, timelineC];

      myTables.forEach((table, tableIndex) => {
        let totalQty = 0; // Initialize the total quantity for this timeline

        table.forEach((row, rowIndex) => {
          console.log("row", row);
          console.log(
            "string creaed",
            `timeline${String.fromCharCode(65 + tableIndex)}`
          );
          if (
            row[3] ===
              updatedUnitsThisHour[
                `timeline${String.fromCharCode(66 + tableIndex)}`
              ].item &&
            row[4] ===
              updatedUnitsThisHour[
                `timeline${String.fromCharCode(66 + tableIndex)}`
              ].product
          ) {
            // Update the total quantity for this timeline
            totalQty += row[5];

            // Set the values in the unitsThisHour state based on the current timeline
            updatedUnitsThisHour[
              `timeline${String.fromCharCode(66 + tableIndex)}`
            ] = {
              item: row[3],
              product: row[4],
              qty: row[5],
              totalQty, // Add the totalQty to the state
            };
            setUnitsThisHour(updatedUnitsThisHour);
            console.log(updatedUnitsThisHour);
          }
        });
      });
    });

    /*  setUnitsThisHour(updatedUnitsThisHour); */
    console.log("unitsThisHour", unitsThisHour);
  }, [dateAndTimeline]);

  // Define a function to highlight matching rows in other tables
  const highlightMatchingRows = (row0, row1) => {
    const tables = [dateAndTimeline, timelineA, timelineB, timelineC];
    tables.forEach((table) => {
      table.forEach((row, index) => {
        if (
          row[0].trim().toLowerCase() === row0.trim().toLowerCase() &&
          row[1].trim().toLowerCase() === row1.trim().toLowerCase()
        ) {
          // Apply a class to highlight the matching row
          const trElements = document.querySelectorAll(`.table-row-${index}`);
          trElements.forEach((trElement) => {
            trElement.classList.add("bg-yellow-300");

            trElement.classList.add("transition-transform");
          });
        }
      });
    });
  };

  // Define a function to clear highlights in other tables
  const clearMatchingRowHighlights = (row0, row1) => {
    const tables = [dateAndTimeline, timelineA, timelineB, timelineC];
    tables.forEach((table) => {
      table.forEach((row, index) => {
        if (
          row[0].trim().toLowerCase() === row0.trim().toLowerCase() &&
          row[1].trim().toLowerCase() === row1.trim().toLowerCase()
        ) {
          // Apply a class to highlight the matching row
          const trElements = document.querySelectorAll(`.table-row-${index}`);
          trElements.forEach((trElement) => {
            trElement.classList.remove("bg-yellow-300");

            trElement.classList.remove("transition-transform");
          });
        }
      });
    });
  };

  return (
    <div className="justify-around">
      <StatTracker
        timelineA={timelineA}
        timelineB={timelineB}
        timelineC={timelineC}
        dateAndTimeline={dateAndTimeline}
        setUnitsThisHour={setUnitsThisHour}
        unitsThisHour={unitsThisHour}
      />
      <table className=" table-fixed rounded-lg shadow-lg">
        <tbody>
          <tr>
            <td className="w-1/12 p-2 border-r">
              <table className="w-52 min-h-[400px] rounded-lg shadow-lg">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left bg-blue-500 text-white top-0 sticky">
                      Date
                    </th>
                    <th className="px-2 py-1 text-left bg-blue-500 text-white top-0 sticky">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dateAndTimeline.map((row, index) => (
                    <tr
                      key={index}
                      id={`table-row-${index}`}
                      className={`table-row-${index} ${
                        index % 2 === 0 ? "bg-gray-100" : "bg-white"
                      } hover:bg-yellow-200 cursor-pointer`}
                      onMouseEnter={() => {
                        highlightMatchingRows(row[0], row[1]);
                      }}
                      onMouseLeave={() => {
                        clearMatchingRowHighlights(row[0], row[1]);
                      }}
                    >
                      <td className="px-2 py-1 align-top">{row[0]}</td>
                      <td className="px-2 py-1 align-top">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            <td className="w-1/3 p-2 border-r">
              <table className="min-h-[400px] rounded-lg shadow-lg">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left bg-green-500 text-white top-0 sticky">
                      Item
                    </th>
                    <th className="px-2 py-1 text-left bg-green-500 text-white pl-20 top-0 sticky">
                      Product
                    </th>
                    <th className="px-2 py-1 text-left bg-green-500 text-white top-0 sticky">
                      Qty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timelineA.map((row, index) => (
                    <tr
                      key={index}
                      id={`table-row-${index}`}
                      className={`table-row-${index} ${
                        index % 2 === 0
                          ? `bg-gray-100 ${
                              row[4] === "CIP" ? "bg-red-500 text-white" : ""
                            }`
                          : `bg-white ${row[4] === "CIP" ? "bg-red-200" : ""}`
                      } hover:bg-yellow-200 cursor-pointer`}
                      onMouseEnter={() => {
                        highlightMatchingRows(row[0], row[1]);
                      }}
                      onMouseLeave={() => {
                        clearMatchingRowHighlights(row[0], row[1]);
                      }}
                    >
                      <td
                        className={`px-2 py-1 align-top w-1/6 ${
                          row[0] === "CIP" ? "bg-red-500 text-white" : ""
                        }`}
                      >
                        {row[3]}
                      </td>
                      <td className="px-2 py-1 pl-20 align-top w-4/6">
                        {row[4]}
                      </td>
                      <td className="px-2 py-1 align-top w-1/6">{row[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            <td className="w-1/3 p-2 border-r">
              <table className="table-fixed min-h-[400px] rounded-lg shadow-lg">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left bg-orange-500 text-white top-0 sticky">
                      Item
                    </th>
                    <th className="px-2 py-1 text-left bg-orange-500 text-white pl-10 top-0 sticky">
                      Product
                    </th>
                    <th className="px-2 py-1 text-left bg-orange-500 text-white top-0 sticky">
                      Qty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timelineB.map((row, index) => (
                    <tr
                      key={index}
                      id={`table-row-${index}`}
                      className={`table-row-${index} ${
                        index % 2 === 0
                          ? `bg-gray-100 ${
                              row[4] === "CIP" ? "bg-red-500 text-white" : ""
                            }`
                          : `bg-white ${row[4] === "CIP" ? "bg-red-200" : ""}`
                      } hover:bg-yellow-200 cursor-pointer `}
                      onMouseEnter={() => {
                        highlightMatchingRows(row[0], row[1]);
                      }}
                      onMouseLeave={() => {
                        clearMatchingRowHighlights(row[0], row[1]);
                      }}
                    >
                      <td className={`px-2 py-1 align-top w-1/6 `}>{row[3]}</td>
                      <td className="px-2 py-1 pl-10 align-top w-4/6">
                        {row[4]}
                      </td>
                      <td className="px-2 py-1 align-top w-1/6">{row[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            <td className="w-1/3 p-2 border-r">
              <table className="table-fixed min-h-[400px] rounded-lg shadow-lg">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left bg-purple-500 text-white top-0 sticky ">
                      Item
                    </th>
                    <th className="px-2 py-1 text-left bg-purple-500 text-white pl-5 top-0 sticky">
                      Product
                    </th>
                    <th className="px-2 py-1 text-left bg-purple-500 text-white top-0 sticky ">
                      Qty
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {timelineC.map((row, index) => (
                    <tr
                      key={index}
                      id={`table-row-${index}`}
                      className={`table-row-${index} ${
                        index % 2 === 0
                          ? `bg-gray-100 ${
                              row[4] === "CIP" ? "bg-red-500 text-white" : ""
                            }`
                          : `bg-white ${row[4] === "CIP" ? "bg-red-200" : ""}`
                      } hover:bg-yellow-200 cursor-pointer`}
                      onMouseEnter={() => {
                        highlightMatchingRows(row[0], row[1]);
                      }}
                      onMouseLeave={() => {
                        clearMatchingRowHighlights(row[0], row[1]);
                      }}
                    >
                      <td
                        className={`px-2 py-1 align-top w-1/12 ${
                          row[0] === "CIP" ? "bg-red-500 text-white" : ""
                        }`}
                      >
                        {row[3]}
                      </td>
                      <td className="px-2 py-1 pl-5 align-top w-2/4">
                        {row[4]}
                      </td>
                      <td className="px-2 py-1 align-top w-1/12 ">{row[5]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductionTable;
