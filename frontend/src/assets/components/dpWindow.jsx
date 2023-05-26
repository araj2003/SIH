import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import SymptomSearch from "./searchSymptoms";
import { useGlobalContext } from "./context";
import cancelIcon from "../img/cross icon.svg";
import axios from "axios";
import Prediction from "./Prediction";

const DpWindow = () => {
  let { options } = useGlobalContext();
  let index = useRef(null);
  let allSymptomsString = useRef(null);
  const [symptoms, setSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [copySymptoms, setCopySymptoms] = useState([]);
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

  const handleClick = () => {
    if (symptoms.length != 0) {
      setCopySymptoms(allSymptoms);
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
    setAllSymptoms(newSymptomsArray); // Log the value of index whenever it changes
  }, [index.current]);

  useEffect(() => {
    allSymptomsString.current = allSymptoms.join(""); // Convert allSymptoms array to string
    axios
      .get(`http://127.0.0.1:8000/prediction/${allSymptomsString.current}`)
      .then((response) => {
        if (symptoms.length != 0) {
          setPrediction(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [copySymptoms]); // axios useEffect

  return (
    <div className="dpWindow w-full flex items-center flex-col justify-evenly ">
      <div className="bttns-container flex w-4/5 justify-center items-center gap-10">
        <SymptomSearch
          handleKeyDown={handleKeyDown}
          selectedSymptom={selectedSymptom}
          setSelectedSymptom={setSelectedSymptom}
        />
        <NavLink to="contactdoctor" className="w-1/5">
          <Button variant="outlined" color="primary" className="w-full h-12">
            Contact Doctor
          </Button>
        </NavLink>
        <NavLink to="dashboard" className="w-1/5">
          <Button variant="outlined" color="secondary" className="w-full h-12">
            Dashboard
          </Button>
        </NavLink>
      </div>
      <div className="symptoms w-5/6 flex justify-center gap-10 flex-wrap">
        <div className="w-1/2">
          <div className="w-full h-full flex flex-col justify-between items-center p-1 pb-2">
            <h2 className="w-full text-lg md:text-xl lg:text-2xl xl:text-3xl p-1">
              Your Symptoms
            </h2>
            <div className="flex flex-wrap bg-green-50 w-full m-1 p-1 h-full rounded-lg content-start">
              {symptoms.map((symptom) => (
                <div
                  key={symptom}
                  className="added-symptom p-2 m-1.5 flex rounded-md gap-2 text-center bg-green-200 text-green-950 h-11 "
                >
                  <div className="mb-1">{symptom}</div>
                  <button onClick={() => removeSymptom(symptom)}>
                    <img src={cancelIcon} alt="" className="h-5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="btn-container w-full flex gap-2 px-2 mt-2 justify-center">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClick}
                className="w-1/3 h-11"
              >
                Predict
              </Button>
              <Button variant="outlined" color="error" className="w-1/3 h-11">
                Clear Symptoms
              </Button>
            </div>
          </div>
        </div>
        <div className="w-1/3 p-2 flex flex-col">
          <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl">
            Predicted Result
          </h2>
          {prediction ? (
            <Prediction prediction={prediction} />
          ) : (
            <div className="w-full h-full bg-sky-50 mt-2 rounded-lg p-2 grid place-content-center text-xl italic text-gray-800">
              No prediction
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DpWindow;
