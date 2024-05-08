// ChatWindow.js
import './ChatWindow.css'; // Import the CSS file for styling
import React, { useState, useEffect, useRef } from "react";
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import SendIcon from '@mui/icons-material/Send';
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

import MessageInputForm from './MessageInputForm.js';
import { CardGiftcard } from '@mui/icons-material';
// import { Textarea } from '@mui/joy';


function FriendCheckbox({ username, initialChecked, handleFriendsChange }) {
  console.log("initialChecked", initialChecked);
  const [isChecked, setIsChecked] = useState(initialChecked && initialChecked.current.includes(username) ? true : false);
  const handleChange = () => {
    setIsChecked(!isChecked);
    handleFriendsChange(username);
  };

  return (
    <Checkbox
      checked={isChecked}
      onChange={handleChange}
    />
  );
}



const ChatSection = React.memo(function ChatSection({ handleclose, showOverlay, selectedChatroom, showNewChatRoomCreation, config, bearerToken, chatMessages, fetchChatrooms, setchatOpen, chatOpen, ...props }) {
  const chatSectionRef = useRef(null);
  const socketRef = useRef(null);
  const [init, setinit] = useState(false);
  const tempChatRoomName = useRef('');
  const newChatRoomMembers = useRef([]);
  const [FollowedUsers, setFollowedUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const [chatMessages2, setchatMessages2] = useState(chatMessages);
  console.log("ChatSection rendered");
  const textareaRef = useRef();
  console.log("chatMessages148", chatMessages);


  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const handleCreateNewChatRoom = (e) => {
    e.preventDefault();
    console.log("newChatRoomNameallooohus: ", tempChatRoomName.current);
    console.log("newChatRoomMembers: ", newChatRoomMembers.current);
    axios
      .post(
        'https://www.threadit.tech/api/v1/chatrooms',
        {
          chatroomName: tempChatRoomName.current,
          chatroomMembers: newChatRoomMembers.current,
        },
        config
      )
      .then((response) => {
        if (response.status === 201) {
          console.log("Chatroom created successfully");
          //clear the newChatRoomMembers
          newChatRoomMembers.current = [];
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
  useEffect(() => {
    if (chatMessages) {
      setchatMessages2(chatMessages);
    }
  }
    , [chatMessages]);


  useEffect(() => {
    if (showNewChatRoomCreation) {
      handleGetFollowedUsers();
    }
  }, [showNewChatRoomCreation]);



  // useEffect(() => {
  //   if (!init) {
  //     console.log("hello initttttttttttttttttttttttttttttttttt ");
  //     setinit(true);
  //     const socket = io('http://localhost:3002/', { query: { token: bearerToken } });
  //     socketRef.current = socket;
  //     socketRef.current.on("connect", () => {
  //       console.log("socket  connected");
  //       socketRef.current.emit("login", bearerToken);
  //       socketRef.current.emit('join rooms');

  //       socketRef.current.on("message received", (data) => {
  //         console.log("message received98756", data);
  //         setchatMessages2(prevMessages => [...prevMessages, data]);


  //       });

  //     });
  //   }
  //   return () => {

  //   };
  // }, [init]);

  useEffect(() => {
    if (!socketRef.current) {
      console.log("hello initttttttttttttttttttttttttttttttttt ");
      setinit(true);
      const socket = io('https://www.threadit.tech', { query: { token: bearerToken } });
      socketRef.current = socket;
      socketRef.current.on("connect", () => {
        console.log("socket  connected");
        socketRef.current.emit("login", bearerToken);
        socketRef.current.emit('join rooms');

        socketRef.current.on("message received", (data) => {
          console.log("message to test1", data);
          console.log("message to test2", data);
          //   response.data.data.chatMessages
          setchatMessages2(prevMessages => [...prevMessages, data]);


        });

      });
    }
    return () => {
      if (socketRef.current) {
        // socketRef.current.off("message received");
        // socketRef.current.off("new message");
        // socketRef.current.off("connect")
      }

    };
  }, [socketRef]);



  const handleGetFollowedUsers = async () => {
    axios.get('https://www.threadit.tech/api/v1/users/me/current', config)
      .then(response => {
        const users = response.data.data.user.followedUsers;
        setFollowedUsers(users);
        console.log("followed ssssssssssssssssssssssssssssssssss: ", FollowedUsers);
      })
      .catch(error => {
        console.error('Failed to fetch followed users:', error);
      });
  }


  const handleNameChange = (chatRoomName1) => {
    console.log("chatRoomName1: ", chatRoomName1);
    tempChatRoomName.current = chatRoomName1;
    console.log("after tempChatRoomName: ", tempChatRoomName.current);
  };
  const handleFriendsChange = (selectedFriends) => {
    console.log("selectedFriends: ", selectedFriends);
    if (newChatRoomMembers.current.includes(selectedFriends)) {
      // If selectedFriends is already in the array, remove it
      newChatRoomMembers.current = newChatRoomMembers.current.filter(member => member !== selectedFriends);
    } else {
      // If selectedFriends is not in the array, add it
      newChatRoomMembers.current = newChatRoomMembers.current.concat(selectedFriends);
    }
    console.log("newchatroom ", tempChatRoomName.current)
  };

  let headerText;

  if (showNewChatRoomCreation) {
    headerText = 'Create new chat room';
  } else if (selectedChatroom) {
    headerText = selectedChatroom.chatroomName;
  } else {
    headerText = 'Chat Room';
  }

  return (

    <Grid className="chat-section-second" onClick={stopPropagation}>


      <div className="header-container-secondSection">
        <h1 className="chatroomName-secondSection">
          <h1 className="chatroomName-secondSection">{headerText}</h1>

        </h1>
        <div className="headerTabs-secondSection">
          <IconButton className="settings-button-secondSection" color="primary">
            <SettingsIcon />
          </IconButton>

          <IconButton color="primary" onClick={() => setchatOpen(false)}>
            <ArrowDropDownIcon />
          </IconButton>


          <IconButton className="close-button-secondSections" color="primary" onClick={() => { if (showOverlay) handleclose(socketRef); }}>
            <CloseIcon>
            </CloseIcon >
          </IconButton>

        </div>
      </div>
      <div className="createChatRoom-or-Message">
        {showNewChatRoomCreation ? (

          <div className='createChatRoom1'>

            <div className='createChatRoom2'>
              <div className='createChatRoom3' >

                <TextField

                  ref={textareaRef}

                  className="create-ChatRoomName-secondSection"
                  onChange={(e) => {
                    handleNameChange(e.target.value);
                  }}
                  multiline
                  variant="outlined"
                  placeholder="Write your chatroom name"

                />


              </div>
              {FollowedUsers.map((user, index) => (

                <Card className='FriendCheckbox' key={index}>

                  <FriendCheckbox className='FriendCheckbox1'
                    username={user.username}
                    newChatRoomMembers={newChatRoomMembers}
                    handleFriendsChange={handleFriendsChange}
                  />
                  <label>{user.username}</label>

                </Card>

              ))}
              <Button className='createChatRoom-Button' variant="contained" color="primary" onClick={handleCreateNewChatRoom}>Create</Button>

            </div>
          </div>
        ) :

          (
            <Grid className='ChatAreaBetweenUsers'>
              <Box ref={chatSectionRef}>

                {chatMessages2.map((message, index, arr) => (
                  // console.log("new Date(arr[index - 1].dateSent): ", new Date(arr[index - 1].dateSent), "new Date(message.dateSent): ", new Date(message.dateSent),"new Date() ",new Date(),"new Date(message.dateSent) > 24*60*60*1000",new Date(message.dateSent) > 24*60*60*1000 ),
                  console.log("message.datasend", new Date(message.dateSent)),
                  <div key={index} className="message-container-SecondSection">



                    {(index === 0 || message.sender.username !== arr[index - 1].sender.username
                      || new Date(message.dateSent).getDate() !== new Date(arr[index - 1].dateSent).getDate() ||
                      new Date(message.dateSent).getMonth() !== new Date(arr[index - 1].dateSent).getMonth())
                      && (selectedChatroom._id === message.chatID._id) &&

                      <div className="username-time">
                        <div className="date-SecondSection">

                        </div>
                        <div className="username-SecondSection">
                          <Avatar src={message.sender.profilePicture} className="avatar" style={{ marginRight: '10px' }} />
                          <Typography variant="subtitle1" className="UserNameSecondSection">{message.sender.username}</Typography>
                          <Typography variant="caption" color="text.secondary" className="time-caption">
                            {new Date(message.dateSent).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </Typography>


                        </div>

                      </div>
                    }
                    {selectedChatroom._id === message.chatID._id && <div className="message-text">{message.message}</div>}
                    {
                      index < arr.length - 1 && (() => {
                        let currentMessageDate = new Date(arr[index].dateSent).setHours(0, 0, 0, 0);
                        let nextMessageDate = new Date(arr[index + 1].dateSent).setHours(0, 0, 0, 0);

                        if (currentMessageDate !== nextMessageDate) {
                          let differenceInDays = Math.floor((nextMessageDate - currentMessageDate) / (1000 * 60 * 60 * 24));

                          return differenceInDays === 1 ?
                            <div className="date-separator">Yesterday</div> :
                            differenceInDays > 1 ?
                              <div className="date-separator">{new Date(currentMessageDate).toLocaleDateString('default', { month: 'long', day: 'numeric' })}</div> :
                              "";
                        }

                        return "";
                      })()
                    }


                  </div>
                ))}

                <div ref={messagesEndRef} />
              </Box>


            </Grid>
          )}
      </div>
      {!showNewChatRoomCreation && selectedChatroom && <MessageInputForm selectedChatroom={selectedChatroom} socketRef={socketRef} />}


    </Grid>




  );
});


function ChatWindow({ toggleOverlay, showOverlay, stopPropagation }) {


  console.log("ChatWindow rendered");
  const [chatMessages, setchatMessages] = useState([]);
  const [chatRommsIsFetched, setchatRommsIsFetched] = useState(false);
  const username = localStorage.getItem("username");
  const [chatOpen, setchatOpen] = useState(true);

  // const [chatRoomsMembers, setchatRoomsMembers] = useState([]);
  // const [chatroomName, setchatroomName] = useState([username, "hussein"]);


  // const [newMessage, setNewMessage] = useState('');

  // const [message, setMessage] = useState("");
  // const [messageReceived, setMessageReceived] = useState("");


  // const [newChatRoomName, setnewChatRoomName] = useState('');
  const [showNewChatRoomCreation, setShowNewChatRoomCreation] = useState(false);
  //  <Avatar src={message.sender.profilePicture} />

  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatroom, setselectedChatroom] = useState(null);


  let bearerToken = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${bearerToken}` },

  };







  const loadChat = async (chatroom) => {
    try {
      console.log("i am rendered whic is not goooddddd");
      const response = await axios.get(`https://www.threadit.tech/api/v1/chatrooms/${chatroom._id}/messages/`, config);
      setchatMessages(response.data.data.chatMessages);

      console.log("chatMessages123456789: ", chatMessages);
      setShowNewChatRoomCreation(false);
      setselectedChatroom(chatroom);
      // if (socketRef.current) {
      //   socketRef.current.emit("join rooms");
      // }

    } catch (error) {
      console.error('Failed to load chat:', error);
    }
  };


  const fetchChatrooms = async () => {
    try {
      console.log("trting to fetc h toomss ");
      setchatRommsIsFetched(true);
      const response = await axios.get('https://www.threadit.tech/api/v1/chatrooms/', config);
      //  console.log(response); // Log the entire response
      // console.log("i am the king " + response.data.data.chatrooms);

      if (response.data.data.chatrooms.length > 0) {
        setChatRooms(response.data.data.chatrooms);
      }
    } catch (error) {
      console.error('Failed to fetch chatrooms:', error);
    }
  };






  useEffect(() => {
    if (!chatRommsIsFetched) {
      console.log("fetching chatrooms123456789");
      fetchChatrooms();
    }
  }, []);




  const handleCreateNewChatRoomIcon = () => {
    setShowNewChatRoomCreation(true);
  };


  console.log("selected chat room chatwindow: ", selectedChatroom);


  function ChatRoomList(...props) {
    // State and logic for chat room list
    const stopPropagation = (event) => {
      event.stopPropagation();
    };
    useEffect(() => {
      console.log('ChatRoomList rendered');
    }, []);


    return (
      <Grid className="chat-section-first" onClick={stopPropagation}>
        <div className="headerdisplayChatRooms">
          <h1 className="chat-headerone">Chats</h1>
          <div className="header-icons-firstsecction">
            <IconButton color="primary" onClick={(event) => { handleCreateNewChatRoomIcon(event) }}>
              <AddIcon />
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
    );
  }

  const handleclose = (socketRef) => {
    {
      console.log("socket offf");
      socketRef.current.off("message received");
      socketRef.current.off("new message");
      socketRef.current.off("connect")
      socketRef.current.off("login");
    }
    //call the passed fn to toggleoverlay
    toggleOverlay();
  }

  return (
    <div className="MinimizeChatRoom">
      {chatOpen ? (
        <Grid className="chat-window" onClick={stopPropagation}>{/* onClick={handleClick} */}

          <ChatRoomList />
          <ChatSection handleclose={handleclose} showOverlay={showOverlay} selectedChatroom={selectedChatroom} showNewChatRoomCreation={showNewChatRoomCreation} config={config} bearerToken={bearerToken} chatMessages={chatMessages} fetchChatrooms={fetchChatrooms} setchatOpen={setchatOpen} chatOpen={chatOpen} onClick={stopPropagation} />
        </Grid>
      ) :

        <div >
          <IconButton  color="primary" onClick={() => setchatOpen(true)}>
            <ArrowDropDownIcon />
          </IconButton>
        </div>
      }

    </div>
  );
}


export default React.memo(ChatWindow);;