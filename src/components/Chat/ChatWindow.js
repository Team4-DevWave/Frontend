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
import Cookies from 'js-cookie';
import axios from 'axios';
import SettingsIcon from '@mui/icons-material/Settings';


import { Link } from 'react-router-dom';

function ChatWindow() {
  const [chatMessages, setchatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  let bearerToken = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${bearerToken}` },

  };

  const loadChat = async (chatroom) => {
    try {
      console.log("modyyyyyyyyyyyyyyyyyyyyyyyyy : " + chatroom._id);
      const response = await axios.get(`http://localhost:8000/api/v1/chatrooms/${chatroom._id}/messages/`, config);
      setchatMessages(response.data.data.chatMessages);
      console.log("chatsssssssssssssssssssss" + chatroom.chatroomName);

      setSelectedChatroom(chatroom);
    } catch (error) {
      console.error('Failed to load chat:', error);
    }
  };


  // useEffect(() => {
  //   fetch('http://localhost:8000/api/v1/chatrooms/')
  //     .then(response => response.json())
  //     .then(data => setChatRooms(data));
  // }, []);
  useEffect(() => {
    const fetchChatrooms = async () => {
      try {

        const response = await axios.get('http://localhost:8000/api/v1/chatrooms/', config);
        // console.log(response); // Log the entire response
        console.log(response.data.data.chatrooms);

        if (response.data.data.chatrooms.length > 0) {
          setChatRooms(response.data.data.chatrooms);
        }
      } catch (error) {
        console.error('Failed to fetch chatrooms:', error);
      }
    };

    fetchChatrooms();
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
          {chatRooms.map((chatRoom) => (
            <div className="displayChatRooms" key={chatRoom.id} onClick={() => loadChat(chatRoom)}>
              {chatRoom.chatroomName}
            </div>
          ))}
        </div>



      </div>
      <div className="chat-section-second">
        <div className="header-container">
          <h1 className="chat-header">{selectedChatroom ? selectedChatroom.chatroomName : 'Chat Room'}</h1>
          <div className="headerTabs">
          <IconButton className="settings-button" color="primary">
            <SettingsIcon />
          </IconButton>

          <IconButton className="dropdown-button" color="primary">
            <ArrowDropDownIcon />
          </IconButton>

          <IconButton className="upperClose" color="primary">
            <CloseIcon />
          </IconButton>
          </div>
        </div>


        <div className="messages">
          {chatMessages.map((message, index, arr) => (
            <div key={index}>
              {(index === 0 || message.sender._id !== arr[index - 1].sender._id) &&
                <div className="username-time">
                  <p className="username">{ message.sender.username}</p>
                  <span className="message-time">
                    {new Date(message.dateSent).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              }
              <p className="message-text">{message.message}</p>
            </div>
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