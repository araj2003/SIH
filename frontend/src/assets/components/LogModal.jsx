import React, { useEffect } from "react";
import crossIcon from "../img/cross icon.svg";
import { TextField, Button, Grid } from "@mui/material";

const currentDate = new Date();
const options = { year: "numeric", month: "long", day: "numeric" };

const LogModal = ({ logModal, setLogModal }) => {
  const dateString = currentDate.toLocaleDateString("en-IN", options);
  const closeLogModal = () => {
    setLogModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal")) {
        closeLogModal();
      }
    };

    if (logModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [logModal]);

  if (!logModal) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center p-4 backdrop-blur-sm modal">
      <div className="flex flex-col gap-2 items-center w-72 sm:w-1/3  flex-wrap  bg-white rounded-lg shadow-lg p-8">
        <div className="w-full flex justify-end">
          <button onClick={closeLogModal} className="hover:scale-105">
            <img src={crossIcon} alt="cross-icon" loading="lazy" />
          </button>
        </div>
        <h1 className="text-3xl  mt-4 font-semibold text-gray-700">
          MEDICAL LOG
        </h1>
        <form className="w-full flex flex-col gap-4 items-center">
          <h2 className="p-1 text-lg text-teal-600 font-semibold">
            {dateString}
          </h2>
          <h3 className="w-full text-xl font-semibold text-gray-600 px-1">
            Blood Pressure Level
          </h3>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                id=""
                label="High"
                // value={}
                // onChange={}
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id=""
                label="Low"
                // value={}
                // onChange={}
                type="number"
              />
            </Grid>
          </Grid>
          <h3 className="w-full text-xl font-semibold text-gray-600 px-1">
            Glucose Level
          </h3>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                id=""
                label="Before Breakfast"
                // value={}
                // onChange={}
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id=""
                label="After Breakfast"
                type="number"
                // value={}
                // onChange={}
              />
            </Grid>
          </Grid>
          <Button variant="outlined" color="success">
            Add
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LogModal;
