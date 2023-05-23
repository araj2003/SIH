import { useState } from "react";
import Button from "@mui/material/Button";
import MyAutocomplete from "./searchSymptoms";
import { useGlobalContext } from "./context";
import { useEffect } from "react";
import cancelIcon from "../img/cross icon.svg";
import axios from "axios";
import { NavLink } from "react-router-dom";

const DpWindow = () => {
  let { allSymptomsString } = useGlobalContext();
  const [symptoms, setSymptoms] = useState([]);
  const [prediction, setPrediction] = useState({});
  const isDuplicate = (symptom) => symptoms.includes(symptom);

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
    axios
      .get(`http://127.0.0.1:8000/prediction/${allSymptomsString}`)
      .then((response) => {
        setPrediction(response.data);
        console.log(prediction);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="dpWindow outline outline-indigo-300 w-full flex items-center flex-col justify-evenly gap-5">
      <div className="bttns-container flex w-4/5 justify-center gap-10">
        <MyAutocomplete addSymptom={addSymptom} isDuplicate={isDuplicate} />
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
