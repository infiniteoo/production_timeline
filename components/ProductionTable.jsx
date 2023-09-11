import React, { useState } from "react";

const ProductionTable = ({
  timelineA,
  timelineB,
  timelineC,
  dateAndTimeline,
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div className="w-auto  ">
      <table className="w-auto">
        <tbody>
          <tr>
            <td className="w-1/12 p-2 border-r">
              <table className="w-52  min-h-[400px]">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left">Date</th>
                    <th className="px-2 py-1 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {dateAndTimeline.map((row, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-100 cursor-pointer ${
                        row[0] + row[1] === hoveredRow ? "bg-yellow-200" : ""
                      }`}
                      onMouseEnter={() => setHoveredRow(row[0] + row[1])}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className="px-2 py-1 align-top">{row[0]}</td>
                      <td className="px-2 py-1 align-top">{row[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            <td className="w-1/3 p-2 border-r">
              <table className=" min-h-[400px]">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left">Item</th>
                    <th className="px-2 py-1 text-left pl-20">Product</th>
                    <th className="px-2 py-1 text-left">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {timelineA.map((row, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-100 cursor-pointer ${
                        row[0] + row[1] === hoveredRow ? "bg-yellow-200" : ""
                      }`}
                      onMouseEnter={() => setHoveredRow(row[0] + row[1])}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className="px-2 py-1 align-top w-1/6">{row[0]}</td>
                      <td className="px-2 py-1 pl-20 align-top  w-4/6">
                        {row[1]}
                      </td>
                      <td className="px-2 py-1 align-top w-1/6">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            <td className="w-1/3 p-2 border-r">
              <table className=" table-fixed min-h-[400px]">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left">Item</th>
                    <th className="px-2 py-1 text-left pl-20">Product</th>
                    <th className="px-2 py-1 text-left">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {timelineB.map((row, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-100 cursor-pointer ${
                        row[0] + row[1] === hoveredRow ? "bg-yellow-200" : ""
                      }`}
                      onMouseEnter={() => setHoveredRow(row[0] + row[1])}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className="px-2 py-1 align-top w-1/6">{row[0]}</td>
                      <td className="px-2 py-1 align-top  w-4/6 pl-20">
                        {row[1]}
                      </td>
                      <td className="px-2 py-1 align-top w-1/6">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
            <td className="w-1/3 p-2 border-r">
              <table className=" table-fixed min-h-[400px]">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left">Item</th>
                    <th className="px-2 py-1 text-left  pl-5">Product</th>
                    <th className="px-2 py-1 text-left">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {timelineC.map((row, index) => (
                    <tr
                      key={index}
                      className={`hover:bg-gray-100 cursor-pointer ${
                        row[0] + row[1] === hoveredRow ? "bg-yellow-200" : ""
                      }`}
                      onMouseEnter={() => setHoveredRow(row[0] + row[1])}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className="px-2 py-1 align-top w-1/6">{row[0]}</td>
                      <td className="px-2 py-1 align-top  w-4/6 pl-5">
                        {row[1]}
                      </td>
                      <td className="px-2 py-1 align-top w-1/6">{row[2]}</td>
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
