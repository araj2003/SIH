import React from "react";

const BP_Log = ({ responseData }) => {
  return (
    <div className="p-4 rounded-lg bg-sky-50 shadow-md h-full ml-1">
      {responseData.bp_log.date.map((date, index) => {
        const currentHigh = responseData.bp_log.high[index];
        const currentLow = responseData.bp_log.low[index];

        if (index === 0) {
          return (
            <div key={index} className="flex flex-col mb-1">
              <div className="items-center w-full flex mb-1">
                <div className="h-2 w-2 bg-gray-700 rounded-full mr-2"></div>
                <h2 className="text-lg font-semibold text-teal-900">{date}</h2>
              </div>

              <div className="ml-1">
                <div className="text-sm text-gray-600  h-8 w-1/2 text-center bg-sky-100 flex justify-center rounded-md p-1">
                  <p className="font-semibold">{currentHigh}</p>&nbsp;/&nbsp;
                  <p>{currentLow}</p>
                </div>
              </div>
            </div>
          );
        } else if (responseData.bp_log.date[index - 1] === date) {
          return (
            <div key={index} className="ml-1 mb-1">
              <div className="text-sm text-gray-600  h-7 w-1/2 justify-center bg-sky-100 rounded-md p-1 flex">
                <p className="font-semibold">{currentHigh}</p>&nbsp;/&nbsp;
                <p>{currentLow}</p>
              </div>
            </div>
          );
        } else {
          return (
            <div key={index} className="flex items-center mb-2">
              <div className="h-2 w-2 bg-gray-700 rounded-full mr-2"></div>
              <h2 className="text-lg font-semibold text-teal-900">{}</h2>
            </div>
          );
        }
      })}
    </div>
  );
};

export default BP_Log;
