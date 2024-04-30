// ChatWindow.js
import './ChatWindow.css'; // Import the CSS file for styling
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

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
import socketIOClient from "socket.io-client";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { toast } from 'react-toastify';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Card, CardContent, Avatar } from '@mui/material';

import { Typography, Grid, Container } from '@mui/material';

import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

function ChatWindow() {

  const ChatWindow = styled(Card)({
    display: 'block',
    position: 'fixed',
    bottom: 0,
    height: 500,
    width: 900,
    right: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
  });
  const [chatMessages, setchatMessages] = useState([]);
  const [chatRommsIsFetched, setchatRommsIsFetched] = useState(false);
  const username = localStorage.getItem("username");
  const [chatRoomsMembers, setchatRoomsMembers] = useState([]);
  const [chatroomName, setchatroomName] = useState([username, "hussein"]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [ws, setWs] = useState(null);
  const [newChatRoomName, setnewChatRoomName] = useState();
  const [newChatRoomMembers, setnewChatRoomMembers] = useState([]);
  const [FollowedUsers, setFollowedUsers] = useState([]);

  const [showNewChatRoomCreation, setShowNewChatRoomCreation] = useState(false);
  // <Avatar src={message.sender.profilePicture} />

  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatroom, setSelectedChatroom] = useState(null);
  let bearerToken = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${bearerToken}` },

  };

  const handleGetFollowedUsers = async () => {
    axios.get('http://localhost:8000/api/v1/users/me/current', config)
      .then(response => {
        const users = response.data.data.user.followedUsers;
        setFollowedUsers(users);
        console.log("followed ssssssssssssssssssssssssssssssssss: ", FollowedUsers);
      })
      .catch(error => {
        console.error('Failed to fetch followed users:', error);
      });
  }

  const handleCreateNewChatRoomIcon = () => {
    setShowNewChatRoomCreation(true);
  };
  const handleNameChange = (event) => {
    setnewChatRoomName(event.target.value);
  };
  const handleFriendsChange = (selectedFriends) => {
    console.log("selectedFriends: ", selectedFriends);
    setnewChatRoomMembers(prevMembers => {
      if (prevMembers.includes(selectedFriends)) {
        // If selectedFriends is already in the array, remove it
        return prevMembers.filter(member => member !== selectedFriends);
      } else {
        // If selectedFriends is not in the array, add it
        return prevMembers.concat(selectedFriends);
      }
    });
  };

  const loadChat = async (chatroom) => {
    try {

      const response = await axios.get(`http://localhost:8000/api/v1/chatrooms/${chatroom._id}/messages/`, config);
      setchatMessages(response.data.data.chatMessages);
      setShowNewChatRoomCreation(false);
      setSelectedChatroom(chatroom);
    } catch (error) {
      console.error('Failed to load chat:', error);
    }
  };


  const fetchChatrooms = async () => {
    try {
      console.log("trting to fetc h toomss ");
      setchatRommsIsFetched(true);
      const response = await axios.get('http://localhost:8000/api/v1/chatrooms/', config);
      //  console.log(response); // Log the entire response
      console.log("i am the king " + response.data.data.chatrooms);

      if (response.data.data.chatrooms.length > 0) {
        setChatRooms(response.data.data.chatrooms);
      }
    } catch (error) {
      console.error('Failed to fetch chatrooms:', error);
    }
  };
  const newSocket = socketIOClient('http://localhost:3005');

  useEffect(() => {
    console.log("i am the king1" + chatRommsIsFetched);
    if (!chatRommsIsFetched) {
      console.log("i am the king2");
      fetchChatrooms();
    }

    newSocket.on('connect', () => {
      console.log('ismail Socket connected:', newSocket.connected); // Log the status of the socket connection
    });
     newSocket.on('message recieved', (newMessage) => {
      console.log('New message received:', newMessage);
    });
  
    setSocket(newSocket);
  
    return () => newSocket.disconnect(
      console.log('Socket disconnected:', newSocket.disconnected) // Log the status of the socket connection
    );

  }, []);





  const handleCreateNewChatRoom = (e) => {
    e.preventDefault();
    console.log("newChatRoomName: ", newChatRoomName);
    console.log("ismaillllll: ", newChatRoomMembers);
    axios
      .post(
        'http://localhost:8000/api/v1/chatrooms/',
        {
          chatroomName: newChatRoomName,
          chatroomMembers: newChatRoomMembers,
        },
        config
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("Chatroom created successfully");
          fetchChatrooms();
          toast.success('Chatroom created successfully');
        } else {
          console.log("Failed to create chatroom");
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const sendMessage = (event) => {
    event.preventDefault();
    console.log("want to sendddddddddddddddddddddddddddddddddddddddddd");
    // if (selectedChatroom && selectedChatroom.chatroomMembers) {
    //   console.log('Selected chatroom:', selectedChatroom);
    //   console.log("sender name"+username)
    //   const Sender = selectedChatroom.chatroomMembers.find(member => member.username === username);
    //   console.log('Socket connected1234:', socket && socket.connected); // Log the status of the socket connection

    //   if (socket && socket.connected) {
    //     socket.emit('new message', { chatID: selectedChatroom._id, message: newMessage, sender: Sender }); // Emit a 'new message' event
    //     setNewMessage(''); // Clear the message input after sending
    //   }
    // }
    // else {
    //   console.error('Chatroom or chatroomMembers is not defined');
    // }
    if (socket) {
      const Sender = selectedChatroom.chatroomMembers.find(member => member.username === username);
      console.log('Socket connected:', socket && socket.connected); // Log the status of the socket connection
      socket.emit('new message', { chatID: selectedChatroom._id, message: newMessage, sender: Sender }); // Emit a 'new message' event

    }
  };


  return (
    // <div className="chat-window">

    <ChatWindow className="chat-window" >
      <Grid container className='gridOfchatwindow' >
        <Grid className="chat-section-first"  >
          <div className="header">
            <h1 className="chat-headerone">Chats</h1>
            <div className="header-icons">
              <IconButton color="primary" onClick={(event) => { handleCreateNewChatRoomIcon(event); handleGetFollowedUsers(); }}>
                <AddIcon />
              </IconButton>

              <IconButton color="primary" >
                <ArrowDropDownIcon />
              </IconButton>
            </div>
            {chatRooms.map((chatRoom) => (
              <div className="displayChatRooms" key={chatRoom.id} onClick={() => loadChat(chatRoom)}>
                {chatRoom.chatroomName}
              </div>
            ))}
          </div>



        </Grid>
        <Grid className="chat-section-second ">
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
            {showNewChatRoomCreation ? (
              <div>
                <div>
                  <div style={{ marginBottom: '16px' }}>
                    <TextField label="Chat Room Name" value={newChatRoomName} onChange={handleNameChange} />
                  </div>
                  {FollowedUsers.map((user, index) => (
                    <div key={index}>
                      <Checkbox onChange={() => handleFriendsChange(user.username)} />
                      <label>{user.username}</label>
                    </div>
                  ))}
                  <Button variant="contained" color="primary" onClick={handleCreateNewChatRoom}>Create</Button>
                </div>
              </div>
            ) :
              (
                <Grid container>
                  <Grid>
                    {chatMessages.map((message, index, arr) => (
                      <div key={index} className="message-container">
                        {(index === 0 || message.sender._id !== arr[index - 1].sender._id) &&
                          <div className="username-time">
                            <Avatar src={message.sender.profilePicture} className="avatar" />
                            <Typography variant="subtitle1">{message.sender.username}</Typography>
                            <Typography variant="caption" color="text.secondary" className="time-caption">
                              {new Date(message.dateSent).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                          </div>
                        }
                        <Typography variant="body1" className="message-text">{message.message}</Typography>
                      </div>
                    ))}
                  </Grid>
                  <Grid>
                  </Grid>
                </Grid>
              )

            }
          </div>

          <div className="form-container">
            <IconButton color="primary">
              <CameraAltIcon />
            </IconButton>
            <form className="chat-form" onSubmit={sendMessage}>
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

              <IconButton type="submit" color="primary" onClick={sendMessage}>
                <SendIcon />
              </IconButton>
            </form>
          </div>
        </Grid>
      </Grid>
    </ChatWindow>
  );
}

export default ChatWindow;