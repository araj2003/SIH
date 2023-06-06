import React from "react";
import Calendar from "./Calendar";
import Sidebar from "./Sidebar";
import { useState } from "react";
import Record from "./Record";
import dashboardHero from "../img/dashboard-hero.svg";
import BP_chart from "./BP_chart";
import LogModal from "./LogModal";
import BP_Log from "./BP_Log";
import ProfileModal from "./ProfileModal";
import GlucoseLevel from "./GlucoseLevel";
import Sugar_chart from "./Sugar_chart";
const PatientProfile = ({ responseData }) => {
  const [record, setRecord] = useState(false);
  const [logModal, setLogModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const {
    age,
    alcohol_cons,
    blood_glucose,
    bp_log,
    current_med,
    diet,
    dob_day,
    dob_month,
    dob_year,
    exercise,
    first_name,
    height,
    id,
    last_name,
    medical_history,
    new_patient,
    sex,
    smoke_cons,
    user,
    weight,
  } = responseData;

  if (responseData.new_patient) {
    return null;
  }
  return (
    <div className=" flex justify-center flex-col items-center  ">
      {Object.keys(responseData).length > 0 ? (
        <>
          <div className="bg-gray-200 w-full rounded-2xl flex flex-wrap justify-center gap-2 p-3">
            <div className="bg-gray-800 w-5/6 p-2 sm:w-1/5 lg:w-1/12  rounded-md">
              <Sidebar
                setRecord={setRecord}
                setLogModal={setLogModal}
                setProfileModal={setProfileModal}
              />
            </div>
            <div className="w-96 sm:w-3/4 lg:w-2/5 py-2 px-2 gap-2 bg-white  rounded-md flex flex-col items-center justify-evenly">
              <div className="h-36 w-full rounded-md p-2 gap-2 flex items-center greeting">
                <div className="w-1/2 rounded text-3xl font-semibold text-gray-800 pl-5">
                  <p>Hi, {first_name + " " + last_name}</p>
                  <p>Check your</p>
                  <p>Health!</p>
                </div>
                <div className="w-1/2 h-full rounded flex justify-center">
                  <img src={dashboardHero} alt="" className="h-full" />
                </div>
              </div>
              <div className="h-52 w-full rounded-md py-1 px-2 gap-2 flex">
                <div className="w-1/2 rounded-md">
                  <BP_chart chartData={responseData.bp_log} />
                </div>
                <div className="w-1/2 rounded-md">
                  <Sugar_chart chartData={responseData.blood_glucose} />
                </div>
              </div>
              <div className="h-56 bg-gray-300 w-full rounded-md">c</div>
            </div>
            <div className="w-96 sm:w-5/6 lg:w-1/2 gap-2 rounded-md-md flex flex-col items-center justify-evenly">
              <div className="h-64 lg:h-1/2 w-full p-1 flex flex-wrap lg:flex-nowrap  gap-2 justify-center">
                <div className="flex w-96 xs:w-2/3">
                  <Calendar />
                </div>

                <div className="w-2/3 bg-green-300 h-full rounded-md"></div>
              </div>
              <div className="h-96 lg:h-1/2 w-full bg-white shadow-md rounded-lg px-1 pt-3 pb-1 flex gap-2">
                <div className="w-1/2 h-full  rounded-md overflow-scroll shadow-lg p-1">
                  <h2 className="hero-text font-semibold text-xl text-teal-800 p-2">
                    Glucose Log - BreakFast
                  </h2>
                  <GlucoseLevel responseData={responseData} />
                </div>
                <div className="w-1/2 h-full rounded-md overflow-scroll shadow-md p-1">
                  <h2 className="hero-text font-semibold text-xl text-sky-800 p-2">
                    Blood Pressure - High/Low
                  </h2>
                  <BP_Log responseData={responseData} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <p>Age: {age}</p>
            <p>Sex: {sex}</p>
            <p>First Name: {first_name}</p>
            <p>Last Name: {last_name}</p>
            <p>Medical History: {medical_history.join(",")}</p>
            <p>
              Date of Birth: {dob_day}/{dob_month}/{dob_year}
            </p>
            <p>Height: {height}</p>
            <p>Weight: {weight}</p>
            <p>Current Medication: {current_med.join(",")}</p>
            <p>Exercise: {exercise}</p>
            <p>Diet: {diet}</p>
          </div>
          <Record setRecord={setRecord} record={record} />
          <LogModal setLogModal={setLogModal} logModal={logModal} />
          <ProfileModal
            setProfileModal={setProfileModal}
            profileModal={profileModal}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientProfile;
