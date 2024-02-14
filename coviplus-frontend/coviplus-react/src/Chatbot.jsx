import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from 'styled-components';

const Chatbot = () => {
//   const [chatHistory, setChatHistory] = useState([]);

//   const handleEnd = ({ steps, values }) => {
//     const message = values[0].value;
//     fetch("http://127.0.0.1:5000/respond", {
//       method: "POST",
//       body: new URLSearchParams({ message: message}),
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const botMessage = data.bot_message;
//         // Update UI with bot's message
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   };

  return (
    <div className="fixed bottom-4 right-4">
        <ThemeProvider theme={theme}>
    <ChatBot
      headerTitle="Chatbot"
      recognitionEnable={true}
      
      
      steps={[
        {
            id: '1',
            message: 'What is your name?',
            trigger: '2',
        },
          {
            id: '2',
            user: true,
            trigger: '3',
          },
          {
            id: '3',
            message: 'Hi {previousValue}, nice to meet you!',
            end: true,
          },
      ]}
    /></ThemeProvider></div>
  );
};

const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#319795',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#319795',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  }



export default Chatbot;
