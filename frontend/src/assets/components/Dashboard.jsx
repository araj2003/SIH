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
    age: "",
    sex: "",
    // first_name: "",
    // last_name: "",
    // medical_history: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(url, formData, {
        withCredentials: true,
      });
      fetchData();
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
      />
      <PatientProfile responseData={data} />
    </div>
  );
};

export default Dashboard;
