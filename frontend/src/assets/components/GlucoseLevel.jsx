import React from "react";

const GlucoseLevel = ({ responseData }) => {
  return (
    <div className="p-4 rounded-lg bg-teal-50 h-full">
      <table className="w-full text-center">
        <thead>
          <tr>
            <th className="py-2 border-r-2 border-b-2 border-gray-400 text-teal-900 font-semibold">
              Date
            </th>
            <th className="py-2 border-r-2 border-b-2 border-gray-400 text-teal-900 font-semibold">
              Before
            </th>
            <th className="py-2 border-b-2 border-gray-400 text-teal-900 font-semibold">
              After
            </th>
          </tr>
        </thead>
        <tbody>
          {responseData.blood_glucose.date.map((date, index) => {
            const currentBefore = responseData.blood_glucose.before[index];
            const currentAfter = responseData.blood_glucose.after[index];

            return (
              <tr key={index}>
                <td className="py-2 border-r-2 border-gray-400 w-1/3 text-green-900">
                  {date}
                </td>
                <td className="py-2 border-r-2 border-gray-400 w-1/3 text-green-900">
                  {currentBefore}
                </td>
                <td className="py-2 text-teal-900">{currentAfter}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GlucoseLevel;
