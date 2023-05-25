import React from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useGlobalContext } from "./context";

const SymptomSearch = ({
  selectedSymptom,
  setSelectedSymptom,
  handleKeyDown,
}) => {
  const { options } = useGlobalContext();

  return (
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
  );
};

export default SymptomSearch;
