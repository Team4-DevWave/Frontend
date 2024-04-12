import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Sent() {


    const [SentMessages, setSentMessages] = useState([]);

    let bearerToken = Cookies.get('token');
    const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },
    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/messages/sent',config)
            .then(response => {
                setSentMessages(response.data.data.messages);
                console.log('SentMessages:', response.data);

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1 className='title'>Sent Messages</h1>

            <div >
                {Array.isArray(SentMessages) && Object.values(SentMessages).map((message, index) => (
                    <div className="message-container" key={index}>
                        <h2>From: {message.from.username}</h2>
                        <h3>To: {message.to.username}</h3>
                        <h3>Subject: {message.subject}</h3>
                        <h4>{message.message}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Sent;