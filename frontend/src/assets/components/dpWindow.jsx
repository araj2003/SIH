import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import SymptomSearch from "./searchSymptoms";
import { useGlobalContext } from "./context";
import cancelIcon from "../img/cross icon.svg";
import axios from "axios";

const DpWindow = () => {
  let { options } = useGlobalContext();
  let index = useRef(null);
  let allSymptomsString = useRef("0".repeat(130));
  const [symptoms, setSymptoms] = useState([]);
  const [prediction, setPrediction] = useState({});
  const [allSymptoms, setAllSymptoms] = useState(
    Array(options.length + 1).fill("0")
  );

  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const isDuplicate = (symptom) => symptoms.includes(symptom);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (selectedSymptom && !isDuplicate(selectedSymptom)) {
        index.current = options.indexOf(selectedSymptom) + 1;
        setSelectedSymptom(null);
        addSymptom(selectedSymptom);
      } else if (isDuplicate(selectedSymptom)) {
        alert("This symptom has already been added!");
      } else {
        alert("Choose a valid  symptom");
      }
    }
  };

  const addSymptom = (symptom) => {
    if (!symptom) return;

    if (!isDuplicate(symptom)) {
      setSymptoms((prevSymptoms) => [...prevSymptoms, symptom]);
    }
  };

  const removeSymptom = (symptom) => {
    setSymptoms((prevSymptoms) => prevSymptoms.filter((s) => s !== symptom));
  };

  useEffect(() => {
    const newSymptomsArray = [...allSymptoms];
    newSymptomsArray[index.current] = "1";
    setAllSymptoms(newSymptomsArray);
    console.log(index.current); // Log the value of index whenever it changes
  }, [index.current]);

  useEffect(() => {
    allSymptomsString.current = allSymptoms.join(""); // Convert allSymptoms array to string
    console.log(allSymptomsString.current); //
    axios
      .get(`http://127.0.0.1:8000/prediction/${allSymptomsString.current}`)
      .then((response) => {
        setPrediction(response.data);
        console.log(prediction);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [allSymptoms]); // axios useEffect

  return (
    <div className="dpWindow outline outline-indigo-300 w-full flex items-center flex-col justify-evenly gap-5">
      <div className="bttns-container flex w-4/5 justify-center gap-10">
        <SymptomSearch
          handleKeyDown={handleKeyDown}
          selectedSymptom={selectedSymptom}
          setSelectedSymptom={setSelectedSymptom}
        />
        <NavLink to="contactdoctor" className="w-1/5">
          <Button variant="outlined" color="primary" className="w-full h-full">
            Contact Doctor
          </Button>
        </NavLink>
        <NavLink to="dashboard" className="w-1/5">
          <Button
            variant="outlined"
            color="secondary"
            className="w-full h-full"
          >
            Dashboard
          </Button>
        </NavLink>
      </div>
      <div className="symptoms w-4/5 flex justify-around outline outline-blue-400 p-5">
        <div className="outline-red-400 outline w-1/2">
          <div className="flex flex-row flex-wrap justify-center items-center">
            {symptoms.map((symptom) => (
              <div
                key={symptom}
                className="added-symptom p-2 m-1.5 flex rounded-md gap-2 text-center bg-green-100 text-green-950"
              >
                <div className="mb-1">{symptom}</div>
                <button onClick={() => removeSymptom(symptom)}>
                  <img src={cancelIcon} alt="" className="h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="outline-red-400 outline w-1/3">Predicted Disease</div>
      </div>
    </div>
  );
};

export default DpWindow;
