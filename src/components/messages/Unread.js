// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Unread() {
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         axios.get('http://localhost:3001/posts')
//             .then(response => {
//                 setPosts(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     }, []);

//     const unreadPosts = posts.filter(post => !post.read);

//     return (
//         <div>
//             <div className="header">
//                 <h1 className='title'>Unread Messages</h1>
//                 <div className="horizontalLine"></div>
//             </div>
//             {unreadPosts.length === 0 && <p>There doesn't seem to be anything here</p>}

//             {unreadPosts.map((message, index) => (
//                 <div key={index} className={message.read ? false : true}>
//                     <h2>From: {message.from}</h2>
//                     <h3>To: {message.to}</h3>
//                     <h3>Subject: {message.subject}</h3>
//                     <h4>{message.message}</h4>
//                 </div>
//             ))}

//         </div>
//     );
// }

// export default Unread;


import axios from 'axios';
import { useEffect, useState } from 'react';

function Unread() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        axios.get('http://localhost:3001/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleMessageClick = async (message) => {
        await axios.put(`http://localhost:3001/posts/${message.id}`, { ...message, read: true });
        fetchPosts();
    };

    const unreadPosts = posts.filter(post => !post.read);

    return (
        <div>
            <div className="header">
                <h1 className='title'>Unread Messages</h1>
                <div className="horizontalLine"></div>
            </div>
            {unreadPosts.length === 0 && <p>There doesn't seem to be anything here</p>}
            {unreadPosts.map((message, index) => (
                <div key={index} onClick={() => handleMessageClick(message)}>
                    <h2>From: {message.from}</h2>
                    <h3>To: {message.to}</h3>
                    <h3>Subject: {message.subject}</h3>
                    <h4>{message.message}</h4>
                </div>
            ))}
        </div>
    );
}

export default Unread;