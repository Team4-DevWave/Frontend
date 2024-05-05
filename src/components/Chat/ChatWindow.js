// ChatWindow.js
import './ChatWindow.css'; // Import the CSS file for styling
import React, { useState, useEffect, useRef } from "react";
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
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { toast } from 'react-toastify';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Card, CardContent, Avatar } from '@mui/material';

import { Typography, Grid, Container } from '@mui/material';
import { Box } from '@mui/material';

import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import { use } from 'marked';

import io from "socket.io-client";



function ChatWindow(props) {
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
  const handleClick = (event) => {
    event.stopPropagation();
    // Rest of your click handler code
  };
  const [chatMessages, setchatMessages] = useState([]);
  const [chatRommsIsFetched, setchatRommsIsFetched] = useState(false);
  const username = localStorage.getItem("username");
  const [chatRoomsMembers, setchatRoomsMembers] = useState([]);
  const [chatroomName, setchatroomName] = useState([username, "hussein"]);
  const [newMessage, setNewMessage] = useState('');
  const inputRef = useRef();
  const textareaRef = useRef();

  // const socket = io.connect("http://localhost:3002");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");


  const [newChatRoomName, setnewChatRoomName] = useState('');
  const [newChatRoomMembers, setnewChatRoomMembers] = useState([]);
  const [FollowedUsers, setFollowedUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const [showNewChatRoomCreation, setShowNewChatRoomCreation] = useState(false);
  //  <Avatar src={message.sender.profilePicture} />

  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatroom, setselectedChatroom] = useState(null);

  const [init, setinit] = useState(false);
  const socketRef = useRef(null);

  let bearerToken = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${bearerToken}` },

  };



  console.log('ChatWindow renderedddddddddddddddd');



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
      console.log("i am rendered whic is not goooddddd");
      const response = await axios.get(`http://localhost:8000/api/v1/chatrooms/${chatroom._id}/messages/`, config);
      setchatMessages(response.data.data.chatMessages);
      setShowNewChatRoomCreation(false);
      setselectedChatroom(chatroom);
      if (socketRef.current) {
        socketRef.current.emit("join rooms");
      }

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






  useEffect(() => {
    if (!chatRommsIsFetched) {
      fetchChatrooms();
    }
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


  function ChatRoomList() {
    // State and logic for chat room list

    useEffect(() => {
      console.log('ChatRoomList rendered');
    }, []);


    return (
      <Grid className="chat-section-first">
        <Grid  >
          <div className="headerdisplayChatRooms">
            <h1 className="chat-headerone">Chats</h1>
            <div className="header-icons">
              <IconButton color="primary" onClick={(event) => { handleCreateNewChatRoomIcon(event); handleGetFollowedUsers(); }}>
                <AddIcon />
              </IconButton>

              <IconButton color="primary" >
                <ArrowDropDownIcon />
              </IconButton>
            </div>
          </div>
          <Grid className="displayAllChatRooms">
            {chatRooms.map((chatRoom) => (
              <div className="displayChatRooms" key={chatRoom.id} onClick={() => loadChat(chatRoom)}>
                {chatRoom.chatroomName}
              </div>
            ))}
          </Grid>

        </Grid>
      </Grid>
    );
  }

  const handleclose = () => {
    {
      socketRef.current.off("message received");
      socketRef.current.off("new message");
      socketRef.current.off("connect")
      socketRef.current.off("login");
    }
  }

  function ChatSection(props) {

    useEffect(() => {
      if (!init) {
        console.log("hello initttttttttttttttttttttttttttttttttt ");
        setinit(true);
        const socket = io('http://localhost:3002/', { query: { token: bearerToken } });
        socketRef.current = socket;
        socketRef.current.on("connect", () => {
          console.log("Connected to the serverrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
          //selectedChatroom._id
          socketRef.current.emit("login", bearerToken);
          socketRef.current.emit('join rooms');
  
          // socket.on("receive_message", (data) => {
          //   setchatMessages(prevMessages => [...prevMessages, data]);
          //   console.log("message receiveddddddddddd: ", data.message);
  
          // });
          socketRef.current.on("message received", (data) => {
            setchatMessages(prevMessages => [...prevMessages, data]);
            console.log("message receiveddddddddddd: ", data.content);
  
          });
  
        });
      }

      
      return () => {

      };
    }, [init]);


    // State and logic for selected chat room
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        console.log('ChatSection ay 7aagaaaaaaaaaaaaaaaaaaa');
      }
    }, [newChatRoomName]);

    return (
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

            <IconButton className="upperClose" color="primary" onClick={props.onClose ? props.onClose : () => { onclick(handleclose) }}>
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div className="messages">
          {showNewChatRoomCreation ? (
            <div>
              <div>
                <div style={{ marginBottom: '16px' }}>

                  <textarea
                    textarea
                    ref={textareaRef}

                    className="ChatRoomName"
                    value={newChatRoomName}
                    onChange={(e) => {
                      setnewChatRoomName(e.target.value);
                    }}
                  />
                </div>
                {FollowedUsers.map((user, index) => (
                  <div key={index}>
                    <Checkbox
                      checked={newChatRoomMembers.includes(user.username)}
                      onChange={() => handleFriendsChange(user.username)}
                    />
                    <label>{user.username}</label>
                  </div>
                ))}
                <Button variant="contained" color="primary" onClick={handleCreateNewChatRoom}>Create</Button>
              </div>
            </div>
          ) :
            (
              // || message.sender._id !== arr[index - 1].sender._id
              <Grid container>
                <Grid item xs={12}>
                  <Box sx={{ overflow: 'auto', maxHeight: 400 }}>

                    {chatMessages.map((message, index, arr) => (
                      <div key={index} className="message-container">
                        {(index === 0) &&
                          <div className="username-time">
                            {/* <Avatar src={message.sender.profilePicture} className="avatar" /> */}
                            <Typography variant="subtitle1">{message.sender.username}</Typography>
                            <Typography variant="caption" color="text.secondary" className="time-caption">
                              {new Date(message.dateSent).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                          </div>
                        }
                        <Typography variant="body1" className="message-text">{message.message}</Typography>
                      </div>
                    ))}

                    <div ref={messagesEndRef} />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                </Grid>
              </Grid>
            )

          }
        </div>
        <div className="message-input-form-Chat">
          <MessageInputForm />
        </div>
      </Grid>



    );
  }

  const sendMessage = async (event) => {
    event.preventDefault();
    console.log("want to sendddddddddddddddddddddddddddddddddddddddddd");
    const Sender = selectedChatroom.chatroomMembers.find(member => member.username === username);
    console.log("Senderrrrrrsssssss: ", Sender);
    console.log("Button clicked");

    // socket.emit("send_message", { message: newMessage, chatroomId: selectedChatroom._id, sender: Sender });
    socketRef.current.emit("new message", { content: newMessage, roomID: selectedChatroom._id });


  };

  function MessageInputForm() {
    // State and logic for message input form
    useEffect(() => {
      inputRef.current.focus();

      console.log('MessageInputForm rendered');
    }, []);
    return (
      <div className="form-container">
        <IconButton color="primary">
          <CameraAltIcon />
        </IconButton>
        <form className="chat-form" onSubmit={sendMessage}>
          <div className="input-container">
            <textarea
              textarea
              ref={inputRef}
              className="chat-input"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
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
    );
  }






  return (

    <ChatWindow className="chat-window" onClick={handleClick} >
      <Grid container className='gridOfchatwindow' >
        <ChatRoomList />
        <ChatSection {...props} />

      </Grid>
    </ChatWindow>
  );
}



export default React.memo(ChatWindow);;

