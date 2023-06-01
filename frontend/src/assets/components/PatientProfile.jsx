import React from "react";
import Calendar from "./Calendar";
const PatientProfile = ({ responseData }) => {
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
    <div className="min-h-screen flex justify-center flex-col items-center outline outline-green-400">
      {Object.keys(responseData).length > 0 ? (
        <>
          <div className="bg-gray-200 w-full rounded-2xl flex flex-wrap  justify-center gap-2 p-3">
            <div className="bg-gray-700 w-5/6 p-2 sm:w-1/5 lg:w-1/12 rounded-md">
              abv
            </div>
            <div className="w-96 sm:w-3/5 lg:w-2/5 py-2 px-2 gap-2 bg-white  rounded-md flex flex-col items-center justify-evenly">
              <div className="h-36 bg-cyan-300 w-full rounded-md p-2 gap-2 flex">
                <div className="w-1/2 bg-blue-600 rounded">
                  <p>Hi {first_name}</p>
                  <p>Check your</p>
                  <p>Health!</p>
                </div>
                <div className="w-1/2 bg-blue-500 rounded"></div>
              </div>
              <div className="h-52 bg-pink-400 w-full rounded-md py-1 px-2 gap-2 flex">
                <div className="w-1/2 bg-white rounded-md">Chart 1</div>
                <div className="w-1/2 bg-white rounded-md">Chart 2</div>
              </div>
              <div className="h-56 bg-gray-300 w-full rounded-md">c</div>
            </div>
            <div className="w-96 sm:w-5/6 lg:w-1/2 p-2 gap-2 bg-gray-300 rounded-md-md flex flex-col items-center justify-evenly">
              <div className="h-64 lg:h-1/2 w-full p-2 flex gap-2">
                <div className="flex w-96 xs:w-2/3">
                  <Calendar />
                </div>

                <div className="w-2/3 bg-green-300 h-full rounded-md"></div>
              </div>
              <div className="h-64 lg:h-1/2 w-full bg-white p-2 flex gap-2">
                <div className="w-1/6 bg-teal-300 h-full rounded-md"></div>
                <div className="w-5/6 bg-blue-300 h-full rounded-md"></div>
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
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientProfile;
