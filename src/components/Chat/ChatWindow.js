// ChatWindow.js
import React from 'react';
import './ChatWindow.css'; // Import the CSS file for styling

const ChatWindow = ({ messages, onClose }) => {
  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>Chat</h2>
        <button className="close-button" onClick={onClose}>Close</button>
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
