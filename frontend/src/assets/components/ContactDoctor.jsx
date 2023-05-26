import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactDoctor = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/doctor/Dentist"
        );
        // Set the doctors data in state'
        setDoctors(response.data);
      } catch (error) {
        // Handle error here
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {doctors.map((doctor) => (
        <div key={doctor.id}>
          <h3>{doctor.name}</h3>
          <p>Speciality: {doctor.speciality}</p>
          <p>Experience: {doctor.experience} years</p>
          <p>Work Address: {doctor.work_address}</p>
          <p>Mobile Number: {doctor.mobile_no}</p>
          <img src={doctor.image_link} alt="Doctor" />
          <a href={doctor.profile_link}>View Profile</a>
        </div>
      ))}
    </div>
  );
};

export default ContactDoctor;
