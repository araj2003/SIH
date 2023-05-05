import { useState } from "react";
import Button from "@mui/material/Button";
import MyAutocomplete from "./searchSymptoms";

const DpWindow = () => {
  const [symptoms, setSymptoms] = useState([]);
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

  return (
    <div className="dpWindow outline outline-indigo-300 w-full flex items-center flex-col justify-evenly gap-5">
      <div className="bttns-container flex w-4/5 justify-center gap-10">
        <MyAutocomplete addSymptom={addSymptom} isDuplicate={isDuplicate} />
        <Button variant="outlined" color="primary" className="w-1/5">
          Contact Doctor
        </Button>
        <Button variant="outlined" color="secondary" className="w-1/5">
          Dashboard
        </Button>
      </div>
      <div className="symptoms w-4/5 flex justify-around outline outline-blue-400 p-5">
        <div className="outline-red-400 outline w-1/2">
          <div className="flex flex-row flex-wrap justify-center items-center">
            {symptoms.map((symptom) => (
              <div
                key={symptom}
                className="added-symptom p-2 m-1.5 flex rounded-md gap-3 text-center bg-green-100 text-green-950"
              >
                <div>{symptom}</div>
                <button onClick={() => removeSymptom(symptom)}>X</button>
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
