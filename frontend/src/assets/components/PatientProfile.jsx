import React from "react";

const PatientProfile = ({ responseData }) => {
  console.log(responseData);
  const {
    age = "",
    alcohol_cons,
    blood_glucose,
    bp_log,
    current_med = "",
    diet = "",
    dob_day = "",
    dob_month = "",
    dob_year = "",
    exercise = "",
    first_name = "",
    height,
    id,
    last_name = "",
    medical_history,
    new_patient,
    sex,
    smoke_cons,
    user,
    weight,
  } = responseData;

  return (
    <div>
      {Object.keys(responseData).length > 0 ? (
        <>
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
          {/* <p>Current Medication: {current_med.join(",")}</p> */}
          <p>Exercise: {exercise}</p>
          <p>Diet: {diet}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientProfile;
