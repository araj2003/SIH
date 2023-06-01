import React from "react";
import record from "../img/record.svg";
import profile from "../img/profile.svg";
import settings from "../img/settings.svg";

const Sidebar = ({ setRecord }) => {
  const handleRecord = () => {
    setRecord(true);
  };

  return (
    <div className="flex sm:flex-col justify-center items-center gap-5 m-1 sm:mt-10">
      <div className="w-10 h-10 p-1 hover:scale-90 hover:cursor-pointer hover:bg-teal-600 rounded-full duration-200 transition-all">
        <img src={profile} alt="" className="w-full" />
      </div>
      <button
        onClick={handleRecord}
        className="w-10 h-10 p-1 hover:scale-90 hover:cursor-pointer hover:bg-teal-600 rounded-full duration-200 transition-all"
      >
        <img
          src={record}
          alt=""
          className="w-full"
          // Add onClick event here
        />
      </button>
      <div className="w-10 h-10 p-1.5 hover:scale-90 hover:cursor-pointer hover:bg-teal-600 rounded-full duration-200 transition-all">
        <img src={settings} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default Sidebar;
