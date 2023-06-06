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
    <div className="profile flex justify-center flex-col items-center pb-4">
      {Object.keys(responseData).length > 0 ? (
        <>
          <div className="w-full flex flex-wrap justify-center gap-2">
            <div className="bg-gray-800 w-5/6 md:p-2 sm:w-1/6 lg:w-1/12  rounded-md">
              <Sidebar
                setRecord={setRecord}
                setLogModal={setLogModal}
                setProfileModal={setProfileModal}
              />
            </div>
            <div className="w-96 sm:w-3/4 lg:w-2/5 bg-white  flex flex-col items-center">
              <div className="h-40 w-full p-1 justify-between flex items-center greeting">
                <div className="w-1/2 text-3xl font-semibold text-gray-800 pl-5 ">
                  <p>Hi, {first_name + " " + last_name}</p>
                  <p>Check your</p>
                  <p>Health!</p>
                </div>
                <div className="w-1/3 h-5/6 rounded flex justify-center">
                  <img src={dashboardHero} alt="" className="h-full" />
                </div>
              </div>
              <div className="charts-container w-full rounded-md flex flex-wrap h-96 sm:h-1/2">
                <div className="w-full sm:w-1/2 rounded-md ">
                  <BP_chart chartData={responseData.bp_log} />
                </div>
                <div className="w-full  sm:w-1/2 rounded-md">
                  <Sugar_chart chartData={responseData.blood_glucose} />
                </div>
              </div>
              <div className="h-3/4 mt-2 bg-gray-300 w-full rounded-md">
                abc
              </div>
            </div>
            <div className=" sm:w-5/6 lg:w-1/2  rounded-md-md flex flex-col items-center justify-evenly">
              <div className="lg:h-1/3 w-full flex flex-wrap lg:flex-nowrap  gap-1 justify-center">
                <div className="flex w-96 xs:w-1/2">
                  <Calendar />
                </div>

                <div className="w-screen sm:w-1/2 h-96 md:h-full bg-green-300 rounded-md"></div>
              </div>
              <div className="lg:h-3/5 w-full flex-wrap md:flex-nowrap flex gap-2">
                <div className="w-full md:w-1/2 md:h-3/4  rounded-md overflow-scroll shadow-md border m-1 p-1">
                  <h2 className="font-semibold text-2xl py-1 text-teal-900 text-center">
                    Glucose
                  </h2>
                  <GlucoseLevel responseData={responseData} />
                </div>
                <div className="w-full md:w-1/2 md:h-3/4 rounded-md overflow-scroll shadow-md border  m-1 p-1">
                  <h2 className=" font-semibold text-2xl text-gray-900 text-center p-2">
                    Blood Pressure
                  </h2>
                  <BP_Log responseData={responseData} />
                </div>
              </div>
            </div>
          </div>
          {/* <div>
            <p>Medical History: {medical_history.join(",")}</p>
            <p>
              Date of Birth: {dob_day}/{dob_month}/{dob_year}
            </p>
            <p>Height: {height}</p>
            <p>Weight: {weight}</p>
            <p>Current Medication: {current_med.join(",")}</p>
            <p>Exercise: {exercise}</p>
            <p>Diet: {diet}</p>
          </div> */}
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
