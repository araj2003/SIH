import React from "react";

const MedicalHistory = ({ data }) => {
  // console.log(data)
  return (
    <div className=" bg-white">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-900">
            <th className="py-2 px-4 border-b font-semibold text-center text-xl">
              Medical History
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index} className="border">
                <td className={`p-2  text-gray-800  "px-5"}`}>
                  <div className="flex items-center">
                    <div>{item}</div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MedicalHistory;
