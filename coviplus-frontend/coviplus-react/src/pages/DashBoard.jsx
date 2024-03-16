import React from 'react';
import BottomNav from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { Avatar, AvatarBadge, AvatarGroup, Toast, Wrap, WrapItem } from '@chakra-ui/react'
import avatar from '../assets/user.png'
import { CChart } from '@coreui/react-chartjs'


function Dashboard() {

  const username = "Alicia";
  const navigate = useNavigate();
  const toast = useToast();

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


  return (
    <body className="bg-gray-50">
      <div className="container mx-auto p-4 h-svh mb-10 bg-gray-50 w-screen">
      <div className="flex gap-4 h-full">
        <div className="flex-shrink-0 w-64 bg-white shadow text-black p-4 rounded relative">
          <h1 className="text-3xl font-bold my-2">CoviPlus</h1>
          <Wrap>
            <WrapItem>
              <Avatar className="my-3" size="lg" src={avatar}></Avatar>
            </WrapItem>
          </Wrap>
          <p>Hello {username}!</p>
          <p>It's good to see you again.</p>
          <button className="absolute bottom-3 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded shadow" onClick={onLogout}>
            Logout
          </button>
        </div>
        <div className="flex-grow w-screen">
          <div className="flex flex-wrap gap-4 h-1/2">
            <div className="w-1/3 bg-white rounded shadow p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Fever History</h3>
              </div>
              <div className="text-gray-500">Today</div>
            </div>
            <div className="w-1/3 bg-white rounded shadow p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Blood Pressure</h3>
              </div>
            </div>
            <div className="w-1/3 bg-white rounded shadow p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Body Temperature</h3>
              </div>
            </div>
            <div className="w-1/3 bg-white rounded shadow p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Heart Rate</h3>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="w-2/3 ml-2 bg-white rounded shadow p-4">
              <h3 className="text-xl font-bold">Statistics</h3>
              <CChart
              type="line" 
              data={{
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                  {
                    label: "Fever",
                    backgroundColor: "rgba(220, 220, 220, 0.2)",
                    borderColor: "rgba(220, 220, 220, 1)",
                    pointBackgroundColor: "rgba(220, 220, 220, 1)",
                    pointBorderColor: "#fff",
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
                  },
                  {
                    label: "Blood Pressure",
                    backgroundColor: "rgba(151, 187, 205, 0.2)",
                    borderColor: "rgba(151, 187, 205, 1)",
                    pointBackgroundColor: "rgba(151, 187, 205, 1)",
                    pointBorderColor: "#fff",
                    data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
                  },
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
      </div>
    </div><BottomNav />
    </body>
  )}

export default Dashboard;
