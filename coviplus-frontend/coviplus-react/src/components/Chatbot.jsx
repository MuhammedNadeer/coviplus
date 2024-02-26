import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async () => {
    // Update messages array with new user message immediately
    setMessages(messages.concat({ userMessage: inputValue, botMessage: '' }));

    // Clear input value after sending message
    setInputValue('');

    // Send user's message to Flask API
    const response = await fetch('http://localhost:5000/message', {
      method: 'POST',
      body: inputValue
    });
    const data = await response.json();
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

  return (
    <div className="fixed bottom-10 right-10 m-4 w-64 bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
      <div className="flex flex-col h-72 p-4 border-b border-gray-300 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="flex flex-col">
            <div className="bg-blue-200 text-right rounded-tl-lg rounded-br-lg rounded-bl-lg my-2 p-2 text-base">{message.userMessage}</div>
            {message.botMessage && <div className="bg-teal-300 text-left rounded-tr-lg rounded-br-lg rounded-bl-lg p-2 text-base">{message.botMessage}</div>}
          </div>
        ))}
      </div>
      <div className=" border-t border-gray-300">
        <div className="flex">
          <input
            type="text"
            name="message"
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 w-12 rounded-l-md border border-gray-300 focus:outline-none focus:ring-teal-600 focus:border-teal-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="px-4 py-2 bg-teal-500 text-white rounded-r-md hover:bg-teal-600 focus:outline-none focus:ring focus:border-blue-500"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
