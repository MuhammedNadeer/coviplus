import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BloodPressureWidget from '../widgets/BloodPressureWidget';
import BloodSugarWidget from '../widgets/BloodSugarWidget';
import Chatbutton from '../components/Chatbutton';
import Chatbot from '../components/Chatbot';


function DashBoard() {
  const [clicked, setClick] = useState(false);


  const handleClick = () => {
    setClick(!clicked)
  }
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
    <>
      <div className="flex"><BloodPressureWidget /><BloodSugarWidget /></div>
      <div className="m-6 flex gap-4">
        <h1 className="text-teal-900 mt-8">Want to Predict Diseases from Your X-ray? Check it out here! </h1>
        <Link to="/predict"><button className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-teal-500 duration-300 rounded-md shadow-2xl shadow-cyan-500/50 mt-4 bg-[#00686F] text-white tracking-wide box-border h-12 w-32">Prediction</button></Link>
      </div><div>
        <Chatbutton onClick={handleClick} />
        {clicked && (
          <Chatbot />
        )}
      </div></>
  );
}

export default DashBoard;
