import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

import { TextField, Button, Container, Grid } from '@mui/material';

function PatientForm(props) {
  const [profileData, setProfileData] = useState({
    age: 0,
    sex: '',
    first_name: '',
    last_name: '',
    medical_history: [],
    dob_day: 0,
    dob_month: 0,
    dob_year: 0,
    height: 0,
    weight: 0,
    current_med: [],
    exercise: '',
    diet: '',
    smoke_cons: '',
    alcohol_cons: '',
    bp_log: {},
    blood_glucose: {}
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/patient')
      .then(response => {
        setProfileData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    axios.put('http://127.0.0.1:8000/patient', profileData, {
      withCredentials: true
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Patient Profile</h1>
      <Container>
      <form onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>

      <Grid item xs={12} sm={6}>
            <TextField
              name="age"
              label="Age"
              variant="outlined"
              fullWidth
              value={profileData.age}
              onChange={handleInputChange}
            />
          </Grid>

        {/* <label>Age:</label>
        <input type="number" name="age" value={profileData.age} onChange={handleInputChange} /> */}


          <Grid item xs={12} sm={6}>
            <TextField
              name="sex"
              label="Sex"
              variant="outlined"
              fullWidth
              value={profileData.sex}
              onChange={handleInputChange}
            />
          </Grid>

        {/* <label>Sex:</label>
        <input type="text" name="sex" value={profileData.sex} onChange={handleInputChange} /> */}

          <Grid item xs={12} sm={6}>
            <TextField
              name="first_name"
              label="First Name"
              variant="outlined"
              fullWidth
              value={profileData.first_name} onChange={handleInputChange}
            />
          </Grid>

        {/* <label>First Name:</label>
        <input type="text" name="first_name" value={profileData.first_name} onChange={handleInputChange} /> */}

          <Grid item xs={12} sm={6}>
            <TextField
              name="last_name"
              label="Last Name"
              variant="outlined"
              fullWidth
              value={profileData.last_name} onChange={handleInputChange}
            />
          </Grid>

        {/* <label>Last Name:</label>
        <input type="text" name="last_name" value={profileData.last_name} onChange={handleInputChange} /> */}


          <Grid item xs={12}>
            <TextField
              name="medical_history"
              label="Medical History"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={profileData.medical_history} onChange={handleInputChange}
            />
          </Grid>


        {/* <label>Medical History:</label>
        <input type="text" name="medical_history" value={profileData.medical_history} onChange={handleInputChange} /> */}


          <Grid item xs={4}>
            <TextField
              name="dob_day"
              label="Date of Birth (Day)"
              variant="outlined"
              fullWidth
              value={profileData.dob_day} onChange={handleInputChange}
            />
          </Grid>

        {/* <label>DOB Day:</label>
        <input type="number" name="dob_day" value={profileData.dob_day} onChange={handleInputChange} /> */}


          <Grid item xs={4}>
            <TextField
              name="dob_month"
              label="Date of Birth (Month)"
              variant="outlined"
              fullWidth
              value={profileData.dob_month} onChange={handleInputChange}
            />
          </Grid>

        {/* <label>DOB Month:</label>
        <input type="number" name="dob_month" value={profileData.dob_month} onChange={handleInputChange} /> */}


        <Grid item xs={4}>
            <TextField
              name="dob_year"
              label="Date of Birth (Year)"
              variant="outlined"
              fullWidth
              value={profileData.dob_year} onChange={handleInputChange}
            />
          </Grid>

        {/* <label>DOB Year:</label>
        <input type="number" name="dob_year" value={profileData.dob_year} onChange={handleInputChange} /> */}


        <Grid item xs={12} sm={6}>
            <TextField
              name="height"
              label="Height"
              variant="outlined"
              fullWidth
              value={profileData.height} onChange={handleInputChange}
            />
          </Grid>

        {/* <label>Height:</label>
        <input type="number" name="height" value={profileData.height} onChange={handleInputChange} /> */}


        <Grid item xs={12} sm={6}>
            <TextField
              name="weight"
              label="Weight"
              variant="outlined"
              fullWidth
              value={profileData.weight} onChange={handleInputChange}
            />
          </Grid>

        {/* <label>Weight:</label>
        <input type="number" name="weight" value={profileData.weight} onChange={handleInputChange} /> */}


        <Grid item xs={12}>
            <TextField
             name="current_med"
             label="Current Medication"
             variant="outlined"
             fullWidth
             multiline
             rows={4}
             value={profileData.current_med} onChange={handleInputChange}
           />
         </Grid>

        {/* <label>Current Medications:</label>
        <input type="text" name="current_med" value={profileData.current_med} onChange={handleInputChange} /> */}


        <Grid item xs={12}>
            <TextField
              name="exercise"
              label="Exercise"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={profileData.exercise} onChange={handleInputChange}
            />
          </Grid>

        {/* <label>Exercise:</label>
        <input type="text" name="exercise" value={profileData.exercise} onChange={handleInputChange} /> */}

          <Grid item xs={12}>
            <TextField
              name="diet"
              label="Diet"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={profileData.diet} onChange={handleInputChange}
            />
          </Grid>

        {/* <label>Diet:</label>
        <input type="text" name="diet" value={profileData.diet} onChange={handleInputChange} /> */}
        </Grid>
        
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>

        {/* <button type="submit">Submit</button> */}

        </form>
        </Container>
    </div>
  )

  }

  export default PatientForm