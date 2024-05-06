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
        console.log('want senddddd:', newMessage);
        // socket.emit("send_message", { message: newMessage, chatroomId: selectedChatroom._id, sender: Sender });
        socketRef.current.emit("new message", { message: newMessage, roomID: selectedChatroom._id });
      };
    
    return (
      <div className="form-container-Message-Input-From">
        <form className="chat-form-Message-Input-From" onSubmit={sendMessage}>
          <div className="input-container-Message-Input-From">
            <TextField
              className="chat-input-Message-Input-From"
              onChange={(e) => {
                setNewMessage(e.target.value);
              }}
              multiline
              variant="outlined"

            />
            <div className="icons-container-Message-Input-From">
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