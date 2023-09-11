import React, { useState, useEffect } from "react";

const ProductionTable = ({
  timelineA,
  timelineB,
  timelineC,
  dateAndTimeline,
}) => {
  // create useeffect on component start

  useEffect(() => {
    const tables = [dateAndTimeline, timelineA, timelineB, timelineC];
    tables.forEach((table) => {
      table.forEach((row, index) => {
        const rowDate = new Date(row[0]);

        console.log("row[1]", row[1]);
        console.log("currentHour", currentHour);

        if (
          rowDate.toDateString() === fakeDate.toDateString() &&
          row[1] === currentHour
        ) {
          console.log("MATCH FOUND");
          // Apply a class to highlight the matching row
          const trElements = document.querySelectorAll(`.table-row-${index}`);
          trElements.forEach((trElement) => {
            trElement.classList.add("bg-green-400");
            trElement.classList.add("font-bold");
          });
        }
      });
    });
  }, [dateAndTimeline]);

  // define current hour
  const currentHour =
    new Date().getHours().toString().padStart(2, "0") + ":00:00";

  // define fake date as 08/29/2023
  const fakeDate = new Date(2023, 7, 29);
  console.log("fakeDate", fakeDate);

  // Define a function to highlight matching rows in other tables
  const highlightMatchingRows = (row0, row1) => {
    const tables = [dateAndTimeline, timelineA, timelineB, timelineC];
    tables.forEach((table) => {
      table.forEach((row, index) => {
        if (
          row[0].trim().toLowerCase() === row0.trim().toLowerCase() &&
          row[1].trim().toLowerCase() === row1.trim().toLowerCase()
        ) {
          console.log("MATCH FOUND");
          console.log(document.querySelectorAll(`.table-row-${index}`));
          console.log(
            "row[0]",
            row[0],
            "row[1]",
            row[1],
            "row0",
            row0,
            "row1",
            row1
          );
          // Apply a class to highlight the matching row
          const trElements = document.querySelectorAll(`.table-row-${index}`);
          trElements.forEach((trElement) => {
            trElement.classList.add("bg-yellow-300");
            trElement.classList.add("scale-105");
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
          console.log("MATCH FOUND");
          console.log(document.querySelectorAll(`.table-row-${index}`));
          console.log(
            "row[0]",
            row[0],
            "row[1]",
            row[1],
            "row0",
            row0,
            "row1",
            row1
          );
          // Apply a class to highlight the matching row
          const trElements = document.querySelectorAll(`.table-row-${index}`);
          trElements.forEach((trElement) => {
            trElement.classList.remove("bg-yellow-300");
            trElement.classList.remove("scale-105");
            trElement.classList.remove("transition-transform");
          });
        }
      });
    });
  };

  return (
    <div className="justify-around">
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
                          : `bg-white ${
                              row[4] === "CIP" ? "text-white bg-red-600 " : ""
                            }`
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
                          : `bg-white ${
                              row[4] === "CIP" ? "text-white bg-red-600 " : ""
                            }`
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
                          : `bg-white ${
                              row[4] === "CIP" ? "text-white bg-red-600 " : ""
                            }`
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
