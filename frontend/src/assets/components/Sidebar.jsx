import React from "react";
import record from "../img/record.svg";
import profile from "../img/profile.svg";
import settings from "../img/settings.svg";
const Sidebar = () => {
  return (
    <div className="flex sm:flex-col justify-center items-center gap-4 mt-10">
      <div className="w-12 h-12 p-1.5 hover:scale-110 hover:cursor-pointer hover:bg-teal-500 rounded-full duration-200 transition-all">
        <img src={profile} alt="" className="w-full" />
      </div>
      <div className="w-12 h-12 p-1.5 hover:scale-110 hover:cursor-pointer hover:bg-teal-500 rounded-full duration-200 transition-all  ">
        <img src={record} alt="" className="w-full" />
      </div>
      <div className="w-12 h-12 p-2 hover:scale-110 hover:cursor-pointer hover:bg-teal-500 rounded-full duration-200 transition-all ">
        <img src={settings} alt="" className="w-full" />
      </div>
    </div>
  );
};

export default Sidebar;
