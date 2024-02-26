import React, { useState, useEffect } from 'react';

function DashBoard() {
  // State to hold patient data
  // const [patientData, setPatientData] = useState(null);

  // // Function to fetch patient data based on patientId
  // const fetchPatientData = async () => {
  //   // Dummy API endpoint URL, replace with your actual API endpoint
  //   const apiUrl = `https://api.example.com/patients/${patientId}`;

  //   try {
  //     // Fetch patient data
  //     const response = await fetch(apiUrl);
  //     const data = await response.json();
  //     setPatientData(data);
  //   } catch (error) {
  //     console.error('Error fetching patient data:', error);
  //   }
  // };

  // // Fetch patient data on component mount
  // useEffect(() => {
  //   fetchPatientData();
  // }, [patientId]);

  // // If patientData is not yet fetched, display loading message
  // if (!patientData) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      Hello World
    </div>
  );
}

export default DashBoard;
