import React from "react";

const BP_Log = ({ responseData }) => {
  return (
    <div className="p-2 rounded-lg bg-white">
      {responseData.bp_log.date.map((date, index) => {
        const currentHigh = responseData.bp_log.high[index];
        const currentLow = responseData.bp_log.low[index];

        if (index === 0) {
          return (
            <div key={index} className="flex flex-col mb-1">
              <div className="flex items-center mb-2  bg-slate-100 rounded-md mx-1 p-2">
                <div className="h-2 w-2 bg-gray-700 rounded-full mr-2"></div>
                <h2 className="text-lg font-semibold text-gray-900">{date}</h2>
              </div>

              <div className="ml-1">
                <div
                  className={`text-sm text-gray-700 border border-gray-400 rounded-md p-3 flex justify-between items-center ${
                    currentHigh > 190 && currentLow > 90
                      ? "bg-purple-100"
                      : currentHigh > 190
                      ? "bg-red-100"
                      : currentLow > 90
                      ? "bg-pink-400"
                      : ""
                  }`}
                >
                  <div className="flex">
                    <p className="font-semibold">{currentHigh}</p>
                    <span className="text-gray-500 mx-1">/</span>
                    <p>{currentLow}</p>
                  </div>
                  <div>High / Low</div>
                </div>
              </div>
            </div>
          );
        } else if (responseData.bp_log.date[index - 1] === date) {
          return (
            <div key={index} className="ml-1 mb-1">
              <div
                className={`text-sm text-black  rounded-md p-3 flex items-center justify-between ${
                  currentHigh > 190 && currentLow > 90
                    ? "bg-red-200"
                    : currentHigh > 190
                    ? "bg-orange-200"
                    : currentLow > 90
                    ? "bg-pink-100"
                    : "border border-gray-400"
                }`}
              >
                <div className="flex">
                  <p className="font-semibold">{currentHigh}</p>
                  <span className="text-gray-500 mx-1">/</span>
                  <p>{currentLow}</p>
                </div>
                <div>High / Low</div>
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className="flex items-center mb-2">
              <div className="h-2 w-2 bg-gray-700 rounded-full mr-2"></div>
              <h2 className="text-xl font-semibold text-gray-800">{date}</h2>
            </div>
          );
        }
      })}
    </div>
  );
};

export default BP_Log;
