import React from "react";

const ProductionTable = ({
  timelineA,
  timelineB,
  timelineC,
  dateAndTimeline,
}) => {
  return (
    <div className="w-auto  ">
      <table className="w-auto">
        <tbody>
          <tr>
            <td className="w-1/12 p-2 border-r">
              <table className="w-52 table-fixed min-h-[400px]">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left">Date</th>
                    <th className="px-2 py-1 text-left">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {dateAndTimeline.map((row, index) => (
                    <tr key={index}>
                      <td className="px-2 py-1 align-top">{row[0]}</td>
                      <td className="px-2 py-1 align-top">{row[1]}</td>
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
                    <th className="px-2 py-1 text-left">Product</th>
                    <th className="px-2 py-1 text-left">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {timelineA.map((row, index) => (
                    <tr key={index}>
                      <td className="px-2 py-1 align-top w-1/6">{row[0]}</td>
                      <td className="px-2 py-1 align-top  w-4/6">{row[1]}</td>
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
                    <th className="px-2 py-1 text-left">Product</th>
                    <th className="px-2 py-1 text-left">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {timelineB.map((row, index) => (
                    <tr key={index}>
                      <td className="px-2 py-1 align-top w-1/6">{row[0]}</td>
                      <td className="px-2 py-1 align-top  w-4/6">{row[1]}</td>
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
                    <th className="px-2 py-1 text-left">Product</th>
                    <th className="px-2 py-1 text-left">Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {timelineC.map((row, index) => (
                    <tr key={index}>
                      <td className="px-2 py-1 align-top w-1/6">{row[0]}</td>
                      <td className="px-2 py-1 align-top  w-4/6">{row[1]}</td>
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
