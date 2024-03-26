import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import axios from 'axios';


function MessageList() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/posts')
                    .then(response => {
                console.log('Data received from server:', response.data);
                console.log("ASdsa");
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            {posts.map((message, index) => (
                <div key={index}>
                    <h2>From: {message.from}</h2>
                    <h3>To: {message.to}</h3>
                    <h3>Subject: {message.subject}</h3>
                    <h4>{message.message}</h4>
                </div>
            ))}
        </div>
    );
}

export default MessageList;