import React from "react";
import { TextField, Button, Container, Grid } from "@mui/material";

const PatientForm = ({ profileData, handleInputChange, handleFormSubmit }) => {
  return (
    <div className="my-5 flex flex-col justify-center">
      <div className="flex justify-center">
        <h2 className="m-2 heading p-6 w-4/5 text-3xl text-gray-800">
          Empowering Your Health Journey
        </h2>
      </div>
      <Container>
        <form onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="age"
                label="Age"
                variant="outlined"
                fullWidth
                type="number"
                value={profileData.age}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="sex"
                label="Sex"
                variant="outlined"
                fullWidth
                value={profileData.sex}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="first_name"
                label="First Name"
                variant="outlined"
                fullWidth
                value={profileData.first_name}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                name="last_name"
                label="Last Name"
                variant="outlined"
                fullWidth
                value={profileData.last_name}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="medical_history"
                label="Medical History"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={profileData.medical_history}
                onChange={handleInputChange}
              />
            </Grid>

            {/* Rest of the form fields */}
          </Grid>

          <div className="buttonContainer mt-5 w-full">
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              className="w-1/6 h-12"
            >
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default PatientForm;
