import React, { useState, useEffect } from "react";
import axios from "axios";
import PatientForm from "./PatientForm";
import PatientProfile from "./PatientProfile";

const Dashboard = () => {
  const url = "http://127.0.0.1:8000/patient";
  const [data, setData] = useState({});

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

  return (
    <div>
      <PatientForm />
      <PatientProfile responseData={data} />
    </div>
  );
};

export default Dashboard;
