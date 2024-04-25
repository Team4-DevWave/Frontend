// ChatWindow.js
import React from 'react';
import './ChatWindow.css'; // Import the CSS file for styling

const messages = [
  { username: 'Alice', text: 'Hello!' },
  { username: 'Bob', text: 'Hi!' },
  { username: 'Charlie', text: 'Hey!' },
];
function ChatWindow  () {
  const [socket, setSocket] = React.useState(null);
  
  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Chat</h2>
        {/* <button className="close-button" onClick={onClose}>Close</button> */}
      </div>
      <div className="chat-container">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <span className="username">{message.username}:</span>
            <span className="text">{message.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
