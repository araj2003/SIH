import React, { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';



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
      <form onSubmit={handleFormSubmit}>
        <label>Age:</label>
        <input type="number" name="age" value={profileData.age} onChange={handleInputChange} />

        <label>Sex:</label>
        <input type="text" name="sex" value={profileData.sex} onChange={handleInputChange} />

        <label>First Name:</label>
        <input type="text" name="first_name" value={profileData.first_name} onChange={handleInputChange} />

        <label>Last Name:</label>
        <input type="text" name="last_name" value={profileData.last_name} onChange={handleInputChange} />

        <label>Medical History:</label>
        <input type="text" name="medical_history" value={profileData.medical_history} onChange={handleInputChange} />

        <label>DOB Day:</label>
        <input type="number" name="dob_day" value={profileData.dob_day} onChange={handleInputChange} />

        <label>DOB Month:</label>
        <input type="number" name="dob_month" value={profileData.dob_month} onChange={handleInputChange} />

        <label>DOB Year:</label>
        <input type="number" name="dob_year" value={profileData.dob_year} onChange={handleInputChange} />

        <label>Height:</label>
        <input type="number" name="height" value={profileData.height} onChange={handleInputChange} />

        <label>Weight:</label>
        <input type="number" name="weight" value={profileData.weight} onChange={handleInputChange} />

        <label>Current Medications:</label>
        <input type="text" name="current_med" value={profileData.current_med} onChange={handleInputChange} />

        <label>Exercise:</label>
        <input type="text" name="exercise" value={profileData.exercise} onChange={handleInputChange} />

        <label>Diet:</label>
        <input type="text" name="diet" value={profileData.diet} onChange={handleInputChange} />

        <button type="submit">Submit</button>

        </form>
    </div>
  )

  }

  export default PatientForm