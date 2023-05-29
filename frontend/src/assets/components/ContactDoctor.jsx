import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorProfile from "./DoctorProfile";
import SkeletonLoader from "./SkeletonLoader";

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
    <section className="w-screen flex justify-center p-5 h-full">
      {doctors.length ? (
        <DoctorProfile doctors={doctors} />
      ) : (
        <SkeletonLoader />
      )}
    </section>
  );
};

export default ContactDoctor;
