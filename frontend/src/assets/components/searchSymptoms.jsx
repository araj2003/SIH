import React from "react";
import { Autocomplete, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useGlobalContext } from "./context";

const SymptomSearch = ({
  selectedSymptom,
  setSelectedSymptom,
  handleAddSymptom,
}) => {
  const { options } = useGlobalContext();

  return (
    <div className="flex w-3/5 justify-center gap-5 items-center">
      <Autocomplete
        options={options}
        value={selectedSymptom}
        onChange={(e, newValue) => {
          setSelectedSymptom(newValue);
        }}
        className="w-1/2 bg-white"
        renderInput={(params) => (
          <TextField
            variant="outlined"
            color="primary"
            {...params}
            label="Enter your symptoms.."
          />
        )}
      />
      <Button
        variant="outlined"
        color="info"
        onClick={handleAddSymptom}
        size="large"
      >
        Add
      </Button>
    </div>
  );
};

export default SymptomSearch;
