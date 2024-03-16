import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import 'regenerator-runtime/runtime.js'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import BottomNav from '../components/BottomNav';



function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const {transcript, resetTranscript, browserSupportsSpeechRecognition} = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null
  }

  const sendMessage = async () => {
    // Update messages array with new user message immediately
    setMessages(messages.concat({ userMessage: inputValue || transcript, botMessage: '' }));

    // Clear input value after sending message
    setInputValue('');
    resetTranscript();

    // Send user's message to Flask API
    const response = await axios.post('http://localhost:5000/message', {
      message: inputValue
    })
    const data = response.data;
    console.log('Response from Flask:', data.bot_message);

    // Update messages array with bot response
    setMessages(prevMessages => {
      const updatedMessages = [...prevMessages];
      updatedMessages[updatedMessages.length - 1].botMessage = data.bot_message;
      return updatedMessages;
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const startListening = () => {
    SpeechRecognition.startListening();
  };

  return (
    <>
    <div className="fixed inset-0 bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-lg bg-white border border-gray-300 rounded-lg shadow-md">
        <div className="flex flex-col h-96 p-4 border-b border-gray-300 overflow-y-auto" id="container">
          {messages.map((message, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex justify-end">
                <div className="bg-blue-200 rounded-tl-lg rounded-br-lg rounded-bl-lg my-2 p-2 text-base fit-content">
                  {message.userMessage}
                </div>
              </div>
              {message.botMessage && (
                <div className="bg-teal-300 text-base max-w-fit-content rounded-tr-lg rounded-br-lg rounded-bl-lg p-2">
                  {message.botMessage}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="p-4">
          <div className="flex">
            <div className="relative flex-1">
              <input
                type="text"
                name="message"
                autoComplete="off"
                placeholder="Type your message..."
                className="px-3 py-2 w-full rounded-bl-lg focus:outline-none focus:ring-teal-600 focus:border-teal-500"
                value={inputValue || transcript}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress} />
              <button
                className="absolute inset-y-0 right-0 flex items-center px-4 bg-transparent text-gray-400 rounded-r-md hover:text-gray-600 focus:outline-none"
                onClick={startListening}
              >
                <FontAwesomeIcon icon={faMicrophone} />
              </button>
            </div>
            <button
              className="px-4 py-2 bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-500 ml-2"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div><BottomNav /></>
  );
}

export default Chatbot;
