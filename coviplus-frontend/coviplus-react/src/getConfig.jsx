const getConfig = (onClick) => {
    const config = {
      botName: "myBot",
      initialMessages: [
        createChatBotMessage(`Hi I'm ${botName}`),
      ],
      customComponents: {
         // Replaces the default header
        header: () => <div style={{ backgroundColor: 'red', padding: "5px", borderRadius: "3px" }}>This is the header <button onClick={close}>Close</button></div>
      },
    };
    }
  
  export default getConfig  