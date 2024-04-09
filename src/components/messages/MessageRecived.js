import axios from 'axios';
import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import { PropTypes } from 'prop-types';
import './Messages.css';
import SendAPrivateMessage from './SendAPrivateMessage';
function MessageRecived() {
    const [Messages, setMessages] = useState([]);


    const [ReplyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    useEffect(() => {
        axios.get('http://localhost:3002/send')
            .then(response => {
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    async function handleDelete(id) {
        try {
            const response = await axios.delete(`http://localhost:3002/send/${id}`);
            
            // If the message was deleted successfully, remove it from the state
            if (response.status === 200) {
                setMessages(Messages.filter(message => message.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete message:', error);
        }
    }

    function handleReport(id) {
        // Report the message with the given ID
    }

    function handleBlockUser(user) {
        // Block the user with the given name
    }

   async function handleMarkUnread(id) {
    try {
        const response = await axios.patch(`http://localhost:3002/send/${id}`, {
            read: false
        });

    
    } catch (error) {
        console.error('Failed to mark message as unread:', error);
    }
    }

    const handleReplyClick = (id) => {
        setReplyingTo(id);
    };

    const handleCancelClick = () => {
        setReplyingTo(false);
        setReplyText('');
    };

    const handleSendClick = async (message1) => {

        try {
            const newReply = {
                from: message1.to,
                to: message1.from,
                subject: message1.subject,
                message: replyText
            };

            const response = await axios.put(`http://localhost:3002/send/${message1.id}`, {
                from: message1.from,
                to: message1.to,
                subject: message1.subject,
                message: message1.message,
                replies: [...message1.replies || [], newReply]
            });

            if (response.status === 200) {
                setReplyText('');
            }
        } catch (error) {
            console.error('Failed to send message:', error);
        }

        setReplyingTo(false);
        setReplyText('');
    };

    return (
        <div >
            {Messages.map((message, index) => (
                <div className="message-container" key={index}>
                    <h2>From: {message.from}</h2>
                    <h3>To: {message.to}</h3>
                    <h3>Subject: {message.subject}</h3>
                    <h4>{message.message}</h4>

                    {message.replies && message.replies.map((reply, index) => (
                        <div key={index}>
                            <h3>Reply from {reply.from}</h3>
                            <p>{reply.message}</p>
                        </div>
                    ))}
                    <div className="button-container-in-messageRecived">

                        <button onClick={() => handleDelete(message.id)}>Delete</button>
                        <button onClick={() => handleReport(message.id)}>Report</button>
                        <button onClick={() => handleBlockUser(message.from)}>Block User</button>
                        <button onClick={() => handleMarkUnread(message.id)}>Mark Unread</button>
                        <button onClick={() => handleReplyClick(message.id)}>Reply</button>

                        {ReplyingTo === message.id && (
                            <div>
                                <textarea value={replyText} onChange={e => setReplyText(e.target.value)} />
                                <button onClick={() => handleSendClick(message)}>Send</button>
                                <button onClick={handleCancelClick}>Cancel</button>
                            </div>
                        )}
                    </div>

                </div>
            ))}

        </div>
    );
}


MessageRecived.propTypes = {

};

export default MessageRecived;

