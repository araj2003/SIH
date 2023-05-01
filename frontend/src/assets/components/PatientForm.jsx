import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientForm = () => {
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [medicalhistory, setMedicalHistory] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [currMed, setCurrMed] = useState("");
  const [exercise, setExersice] = useState("");
  const [diet, setDiet] = useState("");
  const [smoke, setSmoke] = useState("");
  const [alcohol, setAlcohol] = useState("");
  const [bpLog, setBpLog] = useState("");
  const [glucose, setGlucose] = useState("");

  const url = "http://127.0.0.1:8000/patient";

  const updateData = async (newData) => {
    try {
      const response = await axios.put(`${url}`, newData);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateData({ age: 30 });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Age:
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </label>
        <label>
          Medical History:
          <input
            type="text"
            value={medicalhistory}
            onChange={(e) => setMedicalHistory(e.target.value)}
          />
        </label>
        <label>
          Date Of Birth:
          <input
            type="text"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
        <label>
          Height:
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
        <label>
          Weight:
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <label>
          current Medicine:
          <input
            type="text"
            value={currMed}
            onChange={(e) => setCurrMed(e.target.value)}
          />
        </label>
        <label>
          Exercise:
          <input
            type="text"
            value={exercise}
            onChange={(e) => setExersice(e.target.value)}
          />
        </label>
        <label>
          Diet:
          <input
            type="text"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
          />
        </label>
        <label>
          Do You Smoke:
          <input
            type="text"
            value={smoke}
            onChange={(e) => setSmoke(e.target.value)}
          />
        </label>
        <label>
          Alcohol Consumption:
          <input
            type="text"
            value={alcohol}
            onChange={(e) => setAlcohol(e.target.value)}
          />
        </label>
        <label>
          Bp :
          <input
            type="text"
            value={bpLog}
            onChange={(e) => setBpLog(e.target.value)}
          />
        </label>
        <label>
          Glucose Level:
          <input
            type="text"
            value={glucose}
            onChange={(e) => setGlucose(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PatientForm;
