import React from 'react';
import BottomNav from '../components/BottomNav';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { Avatar, AvatarBadge, AvatarGroup, Toast, Wrap, WrapItem } from '@chakra-ui/react'
import avatar from '../assets/user.png'


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
    <><div className="container mx-auto p-4 h-svh mb-10">
      <div className="flex gap-4 h-full">
        <div className="flex-shrink-0 w-64 bg-gray-800 text-white p-4 rounded relative">
          <h1 className="text-3xl font-bold">CoviPlus</h1>
          <Wrap>
            <WrapItem>
              <Avatar size="lg" src={avatar}></Avatar>
            </WrapItem>
          </Wrap>
          <p>Hello {username}!</p>
          <p>It's good to see you again.</p>
          <button className="absolute bottom-3 bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded shadow" onClick={onLogout}>
            Logout
          </button>
        </div>
        <div className="flex-grow">
          <div className="flex flex-wrap gap-4">
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
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="w-1/3 bg-white rounded shadow p-4">
              <h3 className="text-xl font-bold">Statistics</h3>
            </div>
          </div>
        </div>
      </div>
    </div><BottomNav /></>
  )}

export default Dashboard;
