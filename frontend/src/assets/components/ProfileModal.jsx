import React, { useEffect } from "react";
import crossIcon from "../img/cross icon.svg";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

const currentDate = new Date();
const options = { year: "numeric", month: "long", day: "numeric" };

const ProfileModal = ({ profileModal, setProfileModal }) => {
  const dateString = currentDate.toLocaleDateString("en-IN", options);
  const closeModal = () => {
    setProfileModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.classList.contains("modal")) {
        closeModal();
      }
    };

    if (profileModal) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [profileModal]);

  if (!profileModal) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center p-4 backdrop-blur-sm modal">
      <div className="flex flex-col justify-center items-center w-96 sm:w-2/5  flex-wrap  bg-white rounded-lg shadow-lg px-8 py-8">
        <div className="w-full flex justify-end">
          <button onClick={closeModal} className="hover:scale-105">
            <img src={crossIcon} alt="cross-icon" loading="lazy" />
          </button>
        </div>
        <h1 className="text-3xl pb-6 font-semibold text-gray-700 w-full">
          Edit Profile
        </h1>
        <form className="w-full flex flex-col gap-4 items-center">
          <Grid container spacing={2}>
            <Grid item xs={6} className="w-full">
              <TextField
                id=""
                label="First Name"
                fullWidth
                // value={}
                // onChange={}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id=""
                label="Last Name"
                fullWidth
                // value={}
                // onChange={}
              />
            </Grid>

            <Grid item xs={6} className="w-full">
              <TextField
                id=""
                label="Age"
                fullWidth
                type="number"
                // value={}
                // onChange={}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                // value={profile.dietType}
                // onChange={handleChange}
                name="excercise"
                fullWidth
              >
                <MenuItem value="Male">Male</MenuItem>

                <MenuItem value="Female">Female</MenuItem>

                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id=""
                label="Height (cm)"
                fullWidth
                type="number"
                // value={}
                // onChange={}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id=""
                label="Weight (Kg)"
                fullWidth
                type="number"
                // value={}
                // onChange={}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                name="dob_day"
                label="Day"
                variant="outlined"
                fullWidth
                helperText="Date of Birth"
                type="number"
                // value={profileData.dob_day}
                // onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="dob_month"
                label="Month"
                variant="outlined"
                fullWidth
                helperText="Month of Birth"
                type="number"
                // value={profileData.dob_month}
                // onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                name="dob_year"
                label="Year"
                variant="outlined"
                fullWidth
                helperText="Year of Birth"
                type="number"
                // value={profileData.dob_year}
                // onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel>Diet Type</InputLabel>
              <Select
                // value={profile.dietType}
                // onChange={handleChange}
                name="dietType"
                fullWidth
              >
                <MenuItem value="Vegan">Vegan</MenuItem>
                <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Excercise</InputLabel>
              <Select
                // value={profile.dietType}
                // onChange={handleChange}
                name="excercise"
                fullWidth
              >
                <MenuItem value="Yoga">Yoga</MenuItem>

                <MenuItem value="Mild">Mild Excercises - Walks, Jogs</MenuItem>

                <MenuItem value="Heavy">
                  Heavy Excercises - Running, Lifting
                </MenuItem>

                <MenuItem value="No">No Excercise</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Button
            variant="outlined"
            color="primary"
            type="submit"
            className="w-48"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
