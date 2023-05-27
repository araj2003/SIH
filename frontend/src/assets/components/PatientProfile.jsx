import { useEffect } from "react";

const PatientProfile = ({ responseData }) => {
  console.log(responseData);
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
  useEffect(() => {}, [responseData]);

  return (
    <div>
      {Object.keys(responseData).length > 0 ? (
        <>
          <p>Age: {age}</p>
          <p>Sex: {sex}</p>
          <p>Medical History: {medical_history.join(", ")}</p>
          {/* Display other properties as needed */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PatientProfile;
