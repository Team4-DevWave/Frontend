// import axios from 'axios';
// import { useEffect, useState } from 'react';
// import './Messages.css';

// function Unread() {
//     const [UnreadMessage, setUnreadMessage] = useState([]);
//     const [unreadMentions, setUnreadMentions] = useState([]);

//     let bearerToken = Cookies.get('token');
//     const config = {
//         headers: { Authorization: `Bearer ${bearerToken}` },
//     };
//     useEffect(() => {
//         fetchMessage();
//         fetchMentions();

//     }, []);

//     const fetchMessage = () => {
//         axios.get('http://localhost:3002/send')
//             .then(response => {
//                 setUnreadMessage(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     };

//     const fetchMentions = () => {
//         axios.get('http://localhost:8000/api/v1/messages/mentions')
//             .then(response => {
//                 setUnreadMentions(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     };

//     const handleMessageClick = async (message) => {
//         await axios.put(`http://localhost:3002/send/${message.id}`, { ...message, read: true });
//         fetchMessage();

//     };
//     const handleMentionClick = async (mention) => {

//         await axios.put(`http://localhost:3002/mention/${mention.id}`, { ...mention, read: true });
//         fetchMentions();        
//     };
//     const UnreadMessageFiltered = UnreadMessage.filter(UnreadMessage => !UnreadMessage.read);

//     const UnreadMentionFiltered = unreadMentions.filter(unreadMentions => !unreadMentions.read);

//     return (
//         <div>
//             <div className="header">
//                 <div className="horizontalLine"></div>
//             </div>
//             {UnreadMessageFiltered.length === 0 && UnreadMentionFiltered.length === 0 && <p>There doesn't seem to be anything here</p>}
//             {UnreadMessageFiltered.map((message, index) => (
//                 <div className="message-container" key={index} onClick={() => handleMessageClick(message)}>
//                     <h2>From: {message.from}</h2>
//                     <h3>To: {message.to}</h3>
//                     <h3>Subject: {message.subject}</h3>
//                     <h4>{message.message}</h4>
//                 </div>
//             ))}


//             {UnreadMentionFiltered.map((mention, index) => (
//                 <div className="message-container" key={index} onClick={() => handleMentionClick(mention)}>
//                         <>
//                             <p>{mention.user} mentioned you in a post titled "{mention.postTitle}"</p>
//                             <p>Mention Text: {mention.mentionText}</p>
//                         </>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default Unread;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function Unread() {
    const [UnreadMessage, setUnreadMessage] = useState([]);
    const [page, setPage] = useState(1); // add this line
    const limit = 10; // or whatever limit you want

    let bearerToken = Cookies.get('token');
    const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },
        params: { page: page, limit: limit }, // add this line
    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/messages/unread', config)
            .then(response => {
                setUnreadMessage(response.data.data.messages);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [page]);

    return (
        <div>
            <h1 className='title'>Unread Messages</h1>

            <div>
            {Array.isArray(UnreadMessage) && UnreadMessage.length === 0 
                ? <p>There doesn't seem to be something here</p>
                : UnreadMessage.map((message, index) => (
                    <div 
                        className="message-container" 
                        key={index} 
                        onClick={() => handleOnClick(message._id)}
                        
                    >
                        <h2>From: {message.from}</h2>
                        <h3>To: {message.to}</h3>
                        <h3>Subject: {message.subject}</h3>
                        <h4>{message.message}</h4>
                    </div>
                ))
                
            }

        </div>
    </div>
    );

    function handleOnClick(id) {
        console.log('message id:', id);

        axios.patch(`http://localhost:8000/api/v1/messages/:id/markread${id}`,config)
            .then(response => {
                console.log('Message updated:', response.data);

            })
            .catch(error => {
                console.error('Error updating messagessss:', error);
            });
    }
}

export default Unread;