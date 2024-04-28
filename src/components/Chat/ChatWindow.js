// ChatWindow.js
import './ChatWindow.css'; // Import the CSS file for styling
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import GifIcon from '@mui/icons-material/Gif';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';



function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:8000/api/v1/chatrooms/')
  //     .then(response => response.json())
  //     .then(data => setChatRooms(data));
  // }, []);
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/chatrooms/')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setChatRooms(data);
        } else {
          console.error('Data is not an array:', data);
        }
      });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ text: newMessage }));
      setNewMessage('');
    }
  };

  return (
    <div className="chat-window">


      <div className="chat-section-first">
      {chatRooms.map((chatRoom) => (
          <div key={chatRoom.id}>
            {chatRoom.name}
          </div>
        ))}

        <div className="header">
          <h1 className="chat-header">Chats</h1>
          <div className="header-icons">
            <IconButton color="primary">
              <AddIcon />
            </IconButton>

            <IconButton color="primary">
              <ArrowDropDownIcon />
            </IconButton>
          </div>
        </div>



      </div>
      <div className="chat-section-second">

      <IconButton className="upperClose" color="primary">
                <CloseIcon />
              </IconButton>

        <div className="messages">
          {messages.map((message, index) => (
            <p key={index}>{message.text}</p>
          ))}
        </div>

        <div className="form-container">
          <IconButton color="primary">
            <CameraAltIcon />
          </IconButton>
          <form className="chat-form" onSubmit={handleSubmit}>
            <div className="input-container">



              <input
                type="text" className="chat-input"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}

              />
              <div className="icons-container">
                <IconButton color="primary">
                  <EmojiEmotionsIcon />
                </IconButton>
                <IconButton color="primary">
                  <GifIcon />
                </IconButton>
              </div>
            </div>

            <IconButton type="submit" color="primary">
              <SendIcon />
            </IconButton>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;