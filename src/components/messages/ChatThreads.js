// ChatThread.js
import React from 'react';

const ChatThread = ({ thread }) => (
  <div className="chat-thread">
    {thread.messages.map((message, index) => (
      <div key={index} className={`chat-message ${message.sender}`}>
        <div className="chat-message-content">{message.content}</div>
        <div className="chat-message-sender">{message.sender}</div>
      </div>
    ))}
  </div>
);

export default ChatThread;