// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Messages.css';
// let currentId = 1;
// function MentionedUsername() {
//     const [mentions, setMentions] = useState([]);

//     const [showConfirmation, setShowConfirmation] = useState(null);


//     const mention1 = {
//         id: currentId.toString(),
//         userName: 'essam',
//         postTitle: 'video game',
//         mentionText: 'Hello, I mentioned you in my post',
//         read: false
//     };

//     useEffect(() => {
//         const fetchMentions = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3002/mention');
//                 setMentions(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch mentions:', error);
//             }
//         };

//         fetchMentions();

//         const intervalId = setInterval(fetchMentions, 30000);

//         return () => clearInterval(intervalId);
//     }, []);


//     const handleClick = async (sendMention) => {
//         try {
//             const response = await axios.post('http://localhost:3002/mention', sendMention);
//             console.log('currentId', currentId.current);
//             currentId++;
//             mention1.userName+=1;
//             if (response.status === 200) {

//                 console.log('currentId', currentId);
//                 console.log('Mention sent successfully');
//             }
//         } catch (error) {
//             console.error('Failed to send mention22:', error);
//         }
//     };

//     const handleFullComments = (mention) => {
//         console.log('Full comments for:', mention);
//         // Add your code to handle full comments here
//     };
//     const handleContext = (mention) => {
//         console.log('Full comments for:', mention);
//         // Add your code to handle full comments here
//     };
//     const handleReport = (mention) => {
//         console.log('Full comments for:', mention);
//         // Add your code to handle full comments here
//     };
//     const handleBlockUser = async (mention) => {
//         console.log('mentionid :', mention.id);
//         if (showConfirmation === mention.id) {
//             try {
//                 await axios.put(`http://localhost:3002/users/${mention.userName}`);
//                 console.log(`User ${mention.userName} has been blocked.`);
//                 setShowConfirmation(null);
//             } catch (error) {
//                 console.error('Failed to block user:', error);
//             }
//         } else {
//             setShowConfirmation(mention.id);
//         }
//     };

//     const handleMarkUnread = async (mention) => {
//         console.log('Full comments for:', mention.id);
//         try {
//             await axios.patch(`http://localhost:3002/users/${mention.userName}`, { blocked: true });
//         } catch (error) {
//             console.error('Error marking mention as unread:', error);
//         }
//     };

//     const handleReply = (mention) => {
//     };


//     return (
//         <div>


//             {mentions.map((mention, index) => (
//                 <div className="message-container" key={index}>
//                     {mention && (
//                         <>
//                             <p>{mention.userName} mentioned you in a post titled "{mention.postTitle}"</p>
//                             <div className="button-container-in-messageRecived">

//                                 <button onClick={() => handleContext(mention)}>Context</button>
//                                 <button onClick={() => handleFullComments(mention)}>Full comments</button>
//                                 <button onClick={() => handleReport(mention)}>Report</button>
//                                 <button onClick={() => handleBlockUser(mention)}>Block User</button>
//                                 <button onClick={() => handleMarkUnread(mention)}>Mark Unread</button>
//                                 <button onClick={() => handleReply(mention)}>Reply</button>
//                                 {showConfirmation === mention.id ? (
//                                     <div>
//                                         <>Do you want to block this user?</>
//                                         <button className="confirmation-button" onClick={() => handleBlockUser(mention)}>Yes</button>
//                                         <button onClick={() => setShowConfirmation(false)}>No</button>
//                                     </div>
//                                 ) : (
//                                     <button onClick={() => handleBlockUser(mention)}>Block User</button>
//                                 )}

//                             </div>
//                         </>

//                     )}

//                 </div>

//             ))}
//             <button onClick={() => handleClick(mention1)}>Click me</button>

//         </div>
//     );
// }


// export default MentionedUsername;




import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Messages.css';


function MentionedUsername() {






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

        axios.get('http://localhost:8000/api/v1/messages/mentions', config)
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

    async function handleBlockUser(usernameToBlock) {
        axios.post(`http://localhost:8000/api/v1/users/me/block/${usernameToBlock}`, {}, config)
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

    const fetchMessages = () => {
        axios.get(`http://localhost:8000/api/v1/messages/mentions`, config)
            .then(response => {
                setallMessages(response.data.data.messages);
                console.log('Messages fetched:', response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    };

    async function handleMarkUnread(id) {
        axios.patch(`http://localhost:8000/api/v1/messages/${id}/markread`, { read: true }, config)
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
                            <h4> {message.to.username+"     "+ message.message}</h4>
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
                            <h4> {message.to.username+"     "+ message.message}</h4>
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

export default MentionedUsername;

