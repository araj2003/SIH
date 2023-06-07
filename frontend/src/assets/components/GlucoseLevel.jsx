import React from "react";

const GlucoseLevel = ({ responseData }) => {
  const getCellStyles = (value, isAfterColumn) => {
    if (isAfterColumn) {
      if (value > 180) {
        return "bg-red-200";
      }
    } else {
      if (value > 120) {
        return "bg-red-200";
      }
    }
    return "";
  };

  let prevDate = null; // Track previous date

  return (
    <div className="px-1 bg-white">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b font-semibold text-left">Date</th>
            <th className="py-2 px-4 border-b font-semibold text-left">
              Before
            </th>
            <th className="py-2 px-4 border-b font-semibold text-left">
              After
            </th>
          </tr>
        </thead>
        <tbody>
          {responseData &&
            responseData.blood_glucose.date &&
            responseData.blood_glucose.date.map((date, index) => {
              const currentBefore = responseData.blood_glucose.before[index];
              const currentAfter = responseData.blood_glucose.after[index];

              const isFirstDate = prevDate !== date;
              prevDate = date;

              return (
                <tr key={index} className="border-b">
                  <td
                    className={`py-2 px-1 border-r text-gray-800 ${
                      isFirstDate ? "bg-teal-100" : "px-5"
                    }`}
                  >
                    <div className="flex items-center">
                      {isFirstDate && (
                        <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                      )}
                      <div>{date}</div>
                    </div>
                  </td>
                  <td
                    className={`py-2 px-4 border-r ${getCellStyles(
                      currentBefore,
                      false
                    )}`}
                  >
                    {currentBefore}
                  </td>
                  <td
                    className={`py-2 px-4 ${getCellStyles(currentAfter, true)}`}
                  >
                    {currentAfter}
                  </td>
                </tr>
              );
            })}
          {!responseData ||
            (!responseData.blood_glucose.date && (
              <tr>
                <td colSpan="3" className="py-2 px-4">
                  No data available
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default GlucoseLevel;
