import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";

const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

export default function MyAutocomplete({ addSymptom, isDuplicate }) {
  const [selectedSymptom, setSelectedSymptom] = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (selectedSymptom && !isDuplicate(selectedSymptom)) {
        addSymptom(selectedSymptom);
        setSelectedSymptom(null);
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
