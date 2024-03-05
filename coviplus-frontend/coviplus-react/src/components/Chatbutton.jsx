import React from "react";
import ico from '../assets/chat-4-32.ico'
// Import icon from react-icons library

const Chatbutton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-7 right-12 bg-teal-500 text-white rounded-full p-3 shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600"
    ><img src={ico}/>
    </button>
  );
};

export default Chatbutton;