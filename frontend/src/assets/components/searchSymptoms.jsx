import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

export default function MyAutocomplete({ addSymptom, isDuplicate }) {
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [index, setIndex] = useState(null);
  const [allSymptoms, setAllSymptoms] = useState(
    Array(options.length).fill("0")
  );

  useEffect(() => {
    const newSymptomsArray = [...allSymptoms];
    newSymptomsArray[index - 1] = "1";
    setAllSymptoms(newSymptomsArray);
    console.log(index); // Log the value of index whenever it changes
  }, [index]);

  useEffect(() => {
    const allSymptomsString = allSymptoms.join(""); // Convert allSymptoms array to string
    console.log(allSymptomsString); // Log the updated string
  }, [allSymptoms]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (selectedSymptom && !isDuplicate(selectedSymptom)) {
        setIndex(options.indexOf(selectedSymptom));
        setIndex((i) => i + 1);
        setSelectedSymptom(null);
        addSymptom(selectedSymptom);
      } else {
        alert("This symptom has already been added!");
      }
    }
  };

  return (
    <>
      <Autocomplete
        options={options}
        value={selectedSymptom}
        onChange={(e, newValue) => {
          setSelectedSymptom(newValue);
        }}
        className="w-1/3"
        renderInput={(params) => (
          <TextField
            variant="outlined"
            color="primary"
            {...params}
            label="Enter your symptoms.."
            onKeyDown={handleKeyDown}
          />
        )}
      />
    </>
  );
}
