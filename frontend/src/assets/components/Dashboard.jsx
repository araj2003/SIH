import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientForm from "./PatientForm";
import PatientProfile from "./PatientProfile";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const Dashboard = () => {
  const url = "http://127.0.0.1:8000/patient";
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    age: 12,
    sex: "male",
    first_name: "av",
    last_name: "cas",
    dob_day: 12,
    dob_month: 12,
    dob_year: 12,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "medical_history" || name === "current_med") {
      const arrValue = value.split(","); // Split the string value into an array
      setFormData((prevData) => ({
        ...prevData,
        [name]: arrValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      setFormData((prevData) => ({
        ...prevData,
        new_patient: false,
      }));

      await axios.put(url, formData, {
        withCredentials: true,
      });

      await fetchData();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <PatientForm
        profileData={formData}
        handleInputChange={handleInputChange}
        handleFormSubmit={handleFormSubmit}
        patientData={data}
      />
      <PatientProfile responseData={data} />
    </div>
  );
};

export default Dashboard;
