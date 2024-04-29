import React from 'react';
import '../../components/Chat/ChatWindow.css';
import Header from '../../layouts/Header';
import Chat from '../../components/Chat/ChatWindow.js';

function ChatPage() {
  return (
    <div className="navbar-padding">
      <Header />
      <div className="header">
        {/* <Chat messages={[]} onClose={() => console.log('Chat closed')} /> */}
      </div>
    </div>
  );
}

export default ChatPage;