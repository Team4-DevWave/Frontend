import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Sent() {


    const [SentMessages, setSentMessages] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3002/send')
            .then(response => {
                setSentMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
   
    return (
        <div>
            <h1 className='title'>Sent Messages</h1>

            <div >
                    {SentMessages.map((message, index) => (
                        <div className="message-container" key={index}>
                            <h2>From: {message.from}</h2>
                            <h3>To: {message.to}</h3>
                            <h3>Subject: {message.subject}</h3>
                            <h4>{message.message}</h4>
                            <h5>{message.read}</h5>
                        </div>
                    ))}
            </div>
        </div>
            );
}

            export default Sent;