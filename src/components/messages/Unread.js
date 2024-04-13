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
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Messages.css';


function Unread() {






    const [allMessages, setallMessages] = useState([]);
    const [showReplyTextArea, setshowReplyTextArea] = useState(false);
    const [replyText, setReplyText] = useState('');

    const [page, setPage] = useState(1); // initial page
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const limit = 10;

    let bearerToken = Cookies.get('token');
    const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },
        params: { page: page, limit: limit },

    };

    useEffect(() => {
        setLoading(true);

        axios.get('https://www.threadit.tech/api/v1/messages/unread', config)
            .then(response => {
                if (response.data.data.messages.length > 0) {
                    const uniqueMessages = response.data.data.messages.reduce((unique, message) => {
                        return unique.some(m => m._id === message._id) ? unique : [...unique, message];
                    }, allMessages);
                    if (allMessages.length > 0 && allMessages[allMessages.length - 1]._id === response.data.data.messages[response.data.data.messages.length - 1]._id) {
                        setHasMore(false);
                    } else {
                        setallMessages(uniqueMessages);

                        setHasMore(uniqueMessages.length > 0);
                    }
                } else {
                    setHasMore(false);
                }
                setLoading(false);
                console.log('allMessages:', response.data);

            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [page]);
    const observer = useRef();
    const lastMessageElementRef = useCallback(node => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);


    ////////////////////////

    async function handlePermalink(id) {
        try {
            const response = await axios.patch(`https://www.threadit.tech/send/${id}`, {
                read: false
            });


        } catch (error) {
            console.error('Failed to mark message as unread:', error);
        }
    }


    async function handleDelete(id) {
        axios.delete(`https://www.threadit.tech/api/v1/messages/${id}/delete`, config)
            .then(response => {
                setallMessages(allMessages.filter(message => message._id !== id));
                console.log('Message deleted:', response.data);
            })
            .catch(error => {
                console.error('Error deleting message:', error);
            });
    };

    function handleReport(id) {
        // Report the message with the given ID
    }

    async function handleBlockUser(usernameToBlock) {
        axios.post(`https://www.threadit.tech/api/v1/users/me/block/${usernameToBlock}`, {}, config)
            .then(response => {
                console.log('User blocked:', response.data);
            })
            .catch(error => {
                console.error('Error blocking user:', error);
            });
    };

    const handleReplyChange = (event) => {
        setReplyText(event.target.value);
    };
    const handleReplyClick = (id) => {
        setshowReplyTextArea(true);

    };


    const handleSendClick = async (message1) => {

        try {
            const newReply = {
                from: message1.to.username,
                to: message1.from.username,
                subject: message1.subject,
                // message: replyText
            };

            const response = await axios.put(`https://www.threadit.tech/send/${message1.id}`, {
                from: message1.from,
                to: message1.to,
                subject: message1.subject,
                message: message1.message,
                replies: [...message1.replies || [], newReply]
            });

            if (response.status === 200) {
                // setReplyText('');
            }
        } catch (error) {
            console.error('Failed to send message:', error);
        }

        // setReplyingTo(false);
        // setReplyText('');
    };

    const fetchMessages = () => {
        axios.get(`https://www.threadit.tech/api/v1/messages/unread`, config)
            .then(response => {
                setallMessages(response.data.data.messages);
                console.log('Messages fetched:', response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    };

    async function handleMarkUnread(id) {
        axios.patch(`https://www.threadit.tech/api/v1/messages/${id}/markread`, { read: true }, config)
            .then(response => {
                console.log('Message updated:', response.data);
                fetchMessages(); // Refetch the messages
            })
            .catch(error => {
                console.error('Error updating message:', error);
            });
    };



    ////////////////////////


    return (
        <div>
            {allMessages.map((message, index) => {
                if (allMessages.length === index + 1) {
                    return (
                        <div ref={lastMessageElementRef} className="message-container" key={message._id} >
                            <h2>From: {message.from.username}</h2>
                            <h3>To: {message.to.username}</h3>
                            <h3>Subject: {message.subject}</h3>
                            <h4>Message: {message.message}</h4>
                            <h5>Time: {message.createdAt}</h5>
                            <div className="button-container-in-messageRecived">
                                <button onClick={() => handleDelete(message._id)}>Delete</button>
                                <button onClick={() => handleReport(message._id)}>Report</button>
                                <button onClick={() => handleBlockUser(message.from.username)}>Block User</button>
                                <button onClick={() => handleMarkUnread(message._id)}>Mark Unread</button>
                                {/* <button onClick={() => handleReplyClick(message.from.username)}>Reply</button> */}
                                {showReplyTextArea && (
                                    <div>
                                        <textarea value={replyText} onChange={handleReplyChange} />

                                        <button className='Send-button' onClick={() => handleSendClick(message)}>Send</button>
                                        <button onClick={() => setshowReplyTextArea(false)}>Cancel</button>
                                    </div>
                                )}

                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="message-container" key={message._id}>
                            <h2>From: {message.from.username}</h2>
                            <h3>To: {message.to.username}</h3>
                            <h3>Subject: {message.subject}</h3>
                            <h4>Message: {message.message}</h4>
                            <h5>Time: {message.createdAt}</h5>
                            <div className="button-container-in-messageRecived">
                                <button onClick={() => handleDelete(message._id)}>Delete</button>
                                <button onClick={() => handleReport(message._id)}>Report</button>
                                <button onClick={() => handleBlockUser(message.from.username)}>Block User</button>
                                <button onClick={() => handleMarkUnread(message._id)}>Mark Unread</button>
                                {/* <button onClick={() => handleReplyClick(message.from.username)}>Reply</button> */}
                                {showReplyTextArea && (
                                    <div>
                                        <textarea value={replyText} onChange={handleReplyChange} />
                                        <button className='Send-button' onClick={() => handleSendClick(message)}>Send</button>
                                        <button onClick={() => setshowReplyTextArea(false)}>Cancel</button>
                                    </div>
                                )}


                            </div>
                        </div>
                    )
                }
            })}

            <div>{loading && 'Loading...'}</div>
            <div>{!hasMore && 'End of messages'}</div>

        </div>
    );
}

export default Unread;

