import React, { useEffect, useState } from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import GifIcon from '@mui/icons-material/Gif';
import SendIcon from '@mui/icons-material/Send';
import './ChatWindow.css';
import { use } from 'marked';
function MessageInputForm({ selectedChatroom, socketRef}) {
    console.log('MessageInputForm rendered');
    const [newMessage, setNewMessage] = useState("");
    console.log('MessageInputForm rendered');

    useEffect(() => {
      }, []);

    const sendMessage = async (event) => {
        event.preventDefault();
        // socket.emit("send_message", { message: newMessage, chatroomId: selectedChatroom._id, sender: Sender });
        socketRef.current.emit("new message", { message: newMessage, roomID: selectedChatroom._id });
    
    
      };
    
    return (
      <div className="form-container">
        <IconButton color="primary">
          <CameraAltIcon />
        </IconButton>
        <form className="chat-form" onSubmit={sendMessage}>
          <div className="input-container">
            <TextField
              className="chat-input"
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              multiline
              variant="outlined"

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
  export default MessageInputForm;