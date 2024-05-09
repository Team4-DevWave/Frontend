import React, { useEffect, useState } from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import GifIcon from '@mui/icons-material/Gif';
import InputEmoji from 'react-input-emoji'

import SendIcon from '@mui/icons-material/Send';
import './ChatWindow.css';
import { use } from 'marked';


function MessageInputForm({ selectedChatroom, socketRef }) {
  console.log('MessageInputForm rendered');
  const [newMessage, setNewMessage] = useState("");
  console.log('MessageInputForm rendered');

  useEffect(() => {
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    setNewMessage("");
    console.log('want senddddd:', newMessage);
    // socket.emit("send_message", { message: newMessage, chatroomId: selectedChatroom._id, sender: Sender });
    console.log('Socket connection status:', socketRef.current.connected);
    socketRef.current.emit("new message", { message: newMessage, roomID: selectedChatroom._id });
  };

  return (
    <Grid className="chat-form-Message-Input-From" > {/*onSubmit={sendMessage}*/}
      <div className="input-container-Message-Input-From">
      <InputEmoji
          value={newMessage}
          onChange={setNewMessage}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              sendMessage(event);
            }
          }}
          // onEnter={sendMessage}
          cleanOnEnter

          placeholder="Type a message"
        />
        <div className="icons-container-Message-Input-From">

          {/* <IconButton color="primary">
              <GifIcon />
            </IconButton> */}
        </div>
        <IconButton type="submit" color="primary" className='sendIcon-Message-Input-Form' onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </div>

    </Grid>
  );
}
export default MessageInputForm;