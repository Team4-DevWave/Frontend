// ChatContainer.js
import React from 'react';
import ChatThread from './ChatThread';
import ChatInput from './ChatInput';

const ChatContainer = ({ threads, onSendMessage }) => (
  <div className="chat-container">
    {threads.map((thread, index) => (
      <ChatThread key={index} thread={thread} />
    ))}
    <ChatInput onSendMessage={onSendMessage} />
  </div>
);

export default ChatContainer;