// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import socketIOClient from "socket.io-client";
// import { PropTypes } from 'prop-types';
// import './Messages.css';
// function MessageRecived() {
//     const [Messages, setMessages] = useState([]);


//     const [ReplyingTo, setReplyingTo] = useState(null);
//     const [replyText, setReplyText] = useState('');
//     useEffect(() => {
//         axios.get('http://localhost:8000/api/v1/messages/messages')
//             .then(response => {
//                 setMessages(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     }, []);

//     async function handleDelete(id) {
//         try {
//             const response = await axios.delete(`http://localhost:3002/send/${id}`);
            
//             // If the message was deleted successfully, remove it from the state
//             if (response.status === 200) {
//                 setMessages(Messages.filter(message => message.id !== id));
//             }
//         } catch (error) {
//             console.error('Failed to delete message:', error);
//         }
//     }

//     function handleReport(id) {
//         // Report the message with the given ID
//     }

//     function handleBlockUser(user) {
//         // Block the user with the given name
//     }

//    async function handleMarkUnread(id) {
//     try {
//         const response = await axios.patch(`http://localhost:3002/send/${id}`, {
//             read: false
//         });

    
//     } catch (error) {
//         console.error('Failed to mark message as unread:', error);
//     }
//     }

//     const handleReplyClick = (id) => {
//         setReplyingTo(id);
//     };

//     const handleCancelClick = () => {
//         setReplyingTo(false);
//         setReplyText('');
//     };

//     const handleSendClick = async (message1) => {

//         try {
//             const newReply = {
//                 from: message1.to,
//                 to: message1.from,
//                 subject: message1.subject,
//                 message: replyText
//             };

//             const response = await axios.put(`http://localhost:3002/send/${message1.id}`, {
//                 from: message1.from,
//                 to: message1.to,
//                 subject: message1.subject,
//                 message: message1.message,
//                 replies: [...message1.replies || [], newReply]
//             });

//             if (response.status === 200) {
//                 setReplyText('');
//             }
//         } catch (error) {
//             console.error('Failed to send message:', error);
//         }

//         setReplyingTo(false);
//         setReplyText('');
//     };

//     return (
//         <div >
//             {Messages.map((message, index) => (
//                 <div className="message-container" key={index}>
//                     <h2>From: {message.from}</h2>
//                     <h3>To: {message.to}</h3>
//                     <h3>Subject: {message.subject}</h3>
//                     <h4>{message.message}</h4>

//                     {message.replies && message.replies.map((reply, index) => (
//                         <div key={index}>
//                             <h3>Reply from {reply.from}</h3>
//                             <p>{reply.message}</p>
//                         </div>
//                     ))}
//                     <div className="button-container-in-messageRecived">

//                         <button onClick={() => handleDelete(message.id)}>Delete</button>
//                         <button onClick={() => handleReport(message.id)}>Report</button>
//                         <button onClick={() => handleBlockUser(message.from)}>Block User</button>
//                         <button onClick={() => handleMarkUnread(message.id)}>Mark Unread</button>
//                         <button onClick={() => handleReplyClick(message.id)}>Reply</button>

//                         {ReplyingTo === message.id && (
//                             <div>
//                                 <textarea value={replyText} onChange={e => setReplyText(e.target.value)} />
//                                 <button onClick={() => handleSendClick(message)}>Send</button>
//                                 <button onClick={handleCancelClick}>Cancel</button>
//                             </div>
//                         )}
//                     </div>

//                 </div>
//             ))}

//         </div>
//     );
// }


// MessageRecived.propTypes = {

// };

// export default MessageRecived;



import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Messages.css';


function MessageRecived() {






    const [allMessages, setallMessages] = useState([]);

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

        axios.get('http://localhost:8000/api/v1/messages/messages', config)
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
            const response = await axios.patch(`http://localhost:3002/send/${id}`, {
                read: false
            });


        } catch (error) {
            console.error('Failed to mark message as unread:', error);
        }
    }


    async function handleDelete(id) {
        axios.delete(`http://localhost:8000/api/v1/messages/${id}/delete`, config)
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

    function handleBlockUser(user) {
        // Block the user with the given name
    }

    async function handleMarkUnread (message1)  {
        axios.patch(`http://localhost:8000/api/v1/messages/${message1._id}/markread`, { read: !message1.read }, config)
            .then(response => {
                setallMessages(allMessages.map(message =>
                    message._id === message1._id ? { ...message, read: true } : message
                    
                ));
                console.log('Message updated:', response.data);

            })
            .catch(error => {
                console.error('Error updating message:', error);

            }
        );
    };
    const handleReplyClick = (id) => {
        // setReplyingTo(id);
    };

    const handleCancelClick = () => {
        // setReplyingTo(false);
        // setReplyText('');
    };

    const handleSendClick = async (message1) => {

        try {
            const newReply = {
                from: message1.to,
                to: message1.from,
                subject: message1.subject,
                // message: replyText
            };

            const response = await axios.put(`http://localhost:3002/send/${message1.id}`, {
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



    ////////////////////////


    return (
        <div>
            {allMessages.map((message, index) => {
                if (allMessages.length === index + 1) {
                    return (
                        <div ref={lastMessageElementRef} className="message-container" key={message._id}>
                            <h2>From: {message.from.username}</h2>
                            <h3>To: {message.to.username}</h3>
                            <h3>Subject: {message.subject}</h3>
                            <h4>Message: {message.message}</h4>
                            <h5>Time: {message.createdAt}</h5>
                            <div className="button-container-in-messageRecived">
                                <button onClick={() => handlePermalink(message._id)}>Permalink</button>
                                <button onClick={() => handleDelete(message._id)}>Delete</button>
                                <button onClick={() => handleReport(message._id)}>Report</button>
                                <button onClick={() => handleBlockUser(message.from.username)}>Block User</button>
                                <button onClick={() => handleMarkUnread(message)}>Mark Unread</button>
                                <button onClick={() => handleReplyClick(message.from.username)}>Reply</button>
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
                                <button onClick={() => handlePermalink(message._id)}>Permalink</button>
                                <button onClick={() => handleDelete(message._id)}>Delete</button>
                                <button onClick={() => handleReport(message._id)}>Report</button>
                                <button onClick={() => handleBlockUser(message.from.username)}>Block User</button>
                                <button onClick={() => handleMarkUnread(message._id)}>Mark Unread</button>
                                <button onClick={() => handleReplyClick(message.from.username)}>Reply</button>
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

export default MessageRecived;



