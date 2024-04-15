import React from 'react';
import BottomNav from '../components/BottomNav';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { Avatar, AvatarBadge, AvatarGroup, Toast, Wrap, WrapItem } from '@chakra-ui/react'
import avatar from '../assets/user.png'
import { CChart } from '@coreui/react-chartjs'
import Cookies from "js-cookie"
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'


function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("overview");
  const [healthRecordsFile, setHealthRecordsFile] = useState(null);
  const [todaysQuote, settodaysQuote] = useState("");
  const [fever, setFever] = useState("");
  const [sp, setSp] = useState("");
  const [dp, setDp] = useState("");
  const [feverh, setFeverHistory] = useState("");
  const [hr, setHeartRate] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);


  const username = Cookies.get("username");
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    // Fetch today's health quote from an API or use a static list
    fetchTodaysQuote();
  }, []);
  

  const onLogout = () => {
      navigate("/")
      toast({
        title: 'Logout Success.',
        description: "",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
  }

  const fetchTodaysQuote = async () => {
    try {
      // Fetch today's health quote from an API
      setLoading(true);
      const response = await axios.post('http://localhost:5000/quote',{"message": "hi"});
      const quotes = response.data
      console.log("fetching")
      console.log(quotes)
      settodaysQuote(quotes.quote);
      setFever(quotes.fever)
      setDp(quotes.dp)
      setFeverHistory(quotes.feverh)
      setSp(quotes.sp)
      setHeartRate(quotes.hr)
    } catch (error) {
      console.error('Error fetching today\'s quote:', error);
    } finally {
      setLoading(false); // Set loading to false when request completes
    }
  };

  

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setHealthRecordsFile(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('file', healthRecordsFile);
    formdata.append('username', username);

        axios.post('http://127.0.0.1:5000/review', formdata)
            .then(response => {
                console.log(response.data.review);
                setReview(response.data.review);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    // You can perform any necessary operations with the healthRecordsFile here
    console.log("Health Records File Uploaded:", healthRecordsFile);
  };
  

  return (
    <div className="bg-gray-50"><Skeleton isLoaded={!loading}>
      <div className="container flex justify-center mx-auto p-4 h-svh mb-10 bg-gray-50 w-5/6">
      <div className="flex h-full fit-content">
      <div className="flex-shrink-0 w-64 bg-white shadow text-black p-4 rounded relative">
        <h1 className="text-3xl font-bold my-2">CoviPlus</h1>
        <Wrap>
          <WrapItem>
            <Avatar className="my-3" size="lg" src={avatar}></Avatar>
          </WrapItem>
        </Wrap>
        <p>Hello {username}!</p>
        <p>It's good to see you again.</p>
        <hr className="mt-8"/>
        <div className="menu mt-4">
          <button className="block w-full text-left py-3 px-4 text-gray-800 hover:bg-teal-100 hover:text-teal-600 transition duration-300" onClick={() => handleMenuClick("overview")}>Overview</button>
          <button className="block w-full text-left py-3 px-4 text-gray-800 hover:bg-teal-100 hover:text-teal-600 transition duration-300" onClick={() => handleMenuClick("healthrecords")}>Health Records</button>
        </div>

        <button className="absolute bottom-3 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded shadow" onClick={onLogout}>
          Logout
        </button>
      </div>
        {activeMenu === "overview" &&(<div className="flex">
        <div className="flex-grow w-full">
          <div className="flex flex-wrap justify-center gap-4 h-1/2">
            <div className="w-2/5 bg-white rounded shadow p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Fever History</h3>
              </div>
              <div className="text-gray-500">Today : {fever}</div>
              <h1 className="text-8xl font-bold">{feverh}%</h1>
            </div>
            <div className="w-1/3 bg-white rounded shadow p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Blood Pressure</h3>
              </div>
              <h1 className="text-8xl font-bold">{dp} - {sp}</h1>
            </div>
            <div className="w-1/3 bg-white rounded shadow p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Body Temperature</h3>
              </div>
              <h1 className="text-8xl font-bold">{fever}</h1>
            </div>
            <div className="w-2/5 bg-white rounded shadow p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Heart Rate</h3>
              </div>
              <h1 className="text-8xl font-bold">{hr}</h1>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="w-3/4 bg-white rounded shadow p-4">
              <h3 className="text-xl font-bold">Statistics</h3>
              <CChart
              type="line" 
              data={{
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                  {
                    label: "Fever",
                    backgroundColor: "rgba(255, 255, 0, 0.2)", 
                    borderColor: "rgba(255, 255, 0, 1)", 
                    pointBackgroundColor: "rgba(255, 255, 0, 0.5)",
                    pointBorderColor: "#fff",
                    data: [98.6, 99.1, 100.2, 99.5, 100.8, 99.3, 99.7, 100.1, 98.9]
                  },
                  {
                    label: "Blood Pressure",
                    backgroundColor: "rgba(151, 187, 205, 0.2)",
                    borderColor: "rgba(151, 187, 205, 1)",
                    pointBackgroundColor: "rgba(151, 187, 205, 1)",
                    pointBorderColor: "#fff",
                    data: [120, 118, 122, 119, 123, 121, 119, 118, 120]
                  },
                  {
                    label: "Heart Rate",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    pointBackgroundColor: "rgba(255, 99, 132, 1)",
                    pointBorderColor: "#fff",
                    data: [70, 72, 75, 78, 80, 82, 84] // Sample heart rate data
                  }                  
                ],
              }}
              options = {{
                plugins: {
                  legend: {
                    labels: {
                      color: 'black', // Change color as per your requirement
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      color: 'rgba(0, 0, 0, 0.1)',
                    },
                    ticks: {
                      color: 'black', // Change color as per your requirement
                    },
                  },
                  y: {
                    grid: {
                      color: 'rgba(0, 0, 0, 0.1)',
                    },
                    ticks: {
                      color: 'black', // Change color as per your requirement
                    },
                  },
                },
              }}
            />
            </div>
          </div>
        </div>
        <div className="flex flex-shrink-0 w-64 bg-white">
        <div className="mb-4 p-2">
              <h2 className="text-xl font-bold">Today's Health Quote</h2>
              <p>{todaysQuote}</p>
            </div>
        </div>
        </div>)}
        {activeMenu === "healthrecords"&&(
          <div className="flex-grow w-full">
          <div className="flex flex-wrap ml-4 gap-4 h-full">
          <div className="flex-shrink-0 w-full bg-white shadow text-black p-4 rounded relative">
            {/* Health Records File Upload Form */}
            <form onSubmit={handleSubmit} className="flex flex-col justify-around">
              <h1 className="text-3xl font-bold my-2">CoviPlus</h1>
              <label className="block mb-2">
                Upload Health Records:
                <input type="file" onChange={handleFileChange} className="w-full border-teal-300 rounded-md shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 my-2" />
              </label>
              <button type="submit" className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded shadow w-1/4">Submit</button>
            </form>
          </div>
          {/* Display Health Records */}
          <div className="flex flex-col flex-shrink-0 w-full h-1/2 bg-white">
            <h2 className="text-2xl p-2 font-bold mb-4">Health Records</h2>
            {healthRecordsFile && (
              <div>
                <div className="flex flex-col p-2">
                  Quick Review of the health record : 
                  <p>{review}</p>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
        )}
      </div>
    </div><BottomNav /></Skeleton>
    </div>
  )}

export default Dashboard;
