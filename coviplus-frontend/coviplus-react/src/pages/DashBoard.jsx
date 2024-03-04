import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
      <Link to="/predict"><button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-teal-500 duration-300 rounded-md shadow-2xl shadow-cyan-500/50 mt-8 bg-[#00686F] text-white tracking-wide box-border h-12 w-32">Prediction</button></Link>
    </div>
  );
}

export default DashBoard;
