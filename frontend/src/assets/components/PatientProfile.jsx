import axios from 'axios';
import React, { useEffect, useState } from 'react';

const url = "http://127.0.0.1:8000/patient";

const PatientProfile = () => {
    const [data, setData] = useState({});

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

    return (
        <div>

            {Object.keys(data).length > 0 ? (
                <>
                    <p>Age: {data.age}</p>
                    <p>Sex: {data.sex}</p>
                    <p>Medical History: {data.medical_history.join(", ")}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PatientProfile;
