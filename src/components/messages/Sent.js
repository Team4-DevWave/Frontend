import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Sent() {


    const [SentMessages, setSentMessages] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/send')
            .then(response => {
                setSentMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
   
    return (
        <div>
            <div className="header">
                <h1 className='title'>Sent Messages</h1>
                <div className="horizontalLine"></div>
                <div className="receivedMessage">
                    {SentMessages.map((message, index) => (
                        <div key={index}>
                            <h2>From: {message.from}</h2>
                            <h3>To: {message.to}</h3>
                            <h3>Subject: {message.subject}</h3>
                            <h4>{message.message}</h4>
                            <h5>{message.read}</h5>
                        </div>
                    ))}
                </div>
            </div>
        </div>
            );
}

            export default Sent;