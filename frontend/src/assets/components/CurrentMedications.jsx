import React from "react";

const CurrentMedications = ({ responseData }) => {
  const {
    age,
    sex,
    height,
    weight,
    diet,
    exercise,
    dob_day,
    dob_month,
    dob_year,
    smoke_cons,
    alcohol_cons,
    current_med,
  } = responseData;

  const isHeightAvailable = height !== undefined;
  const isWeightAvailable = weight !== undefined;

  return (
    <div className="current-medication text-gray-700 rounded-lg h-full  p-6 hero-stanza">
      <h3 className="title text-3xl font-semibold mb-6">Personal Info</h3>
      <div className="info-grid grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
        <div className="info-cell">
          <span className="label  font-semibold capitalize">Age : </span> {age}
        </div>
        <div className="info-cell">
          <span className="label  font-semibold capitalize">Sex : </span> {sex}
        </div>
        {isHeightAvailable && (
          <div className="info-cell">
            <span className="label  font-semibold capitalize">Height : </span>{" "}
            {height}
          </div>
        )}
        {isWeightAvailable && (
          <div className="info-cell">
            <span className="label  font-semibold capitalize">Weight : </span>{" "}
            {weight}
          </div>
        )}
        <div className="info-cell">
          <span className="label  font-semibold capitalize">
            Date of Birth :
          </span>{" "}
          {dob_day}/{dob_month}/{dob_year}
        </div>
        <div className="info-cell">
          <span className="label  font-semibold capitalize">Exercise : </span>{" "}
          {exercise}
        </div>
        <div className="info-cell">
          <span className="label  font-semibold capitalize">Diet : </span>{" "}
          {diet}
        </div>
        <div className="info-cell">
          <span className="label  font-semibold capitalize">
            Alcohol Consumption :
          </span>{" "}
          {alcohol_cons}
        </div>
        <div className="info-cell">
          <span className="label  font-semibold capitalize">
            Smoke Consumption :
          </span>{" "}
          {smoke_cons}
        </div>
        <div className="info-cell">
          <span className="label  font-semibold capitalize">
            Current Medication :
          </span>{" "}
          {current_med.join(",")}
        </div>
      </div>
    </div>
  );
};

export default CurrentMedications;
