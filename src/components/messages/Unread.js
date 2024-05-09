
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Messages.css';
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';


function Unread() {

    const [allMessages, setallMessages] = useState([]);
    const [showReplyTextArea, setshowReplyTextArea] = useState(false);
    const [replyText, setReplyText] = useState('');
    const [HideBlockButton, setHideBlockButton] = useState(false);
    const [page, setPage] = useState(1); // initial page
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    const [blockConfirmationMessageId, setBlockConfirmationMessageId] = useState(null);

    const handleBlockButtonClick = (messageId) => {
        setBlockConfirmationMessageId(messageId);
    };


    const limit = 10;

    let bearerToken = Cookies.get('token');
    const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },
        params: { page: page, limit: limit },

    };

    useEffect(() => {
        setLoading(true);

        axios.get('http://localhost:8000/api/v1/messages/unread', config)
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

    const handleBlock = () => {
        setHideBlockButton(true);
    };
    const handleCancel = () => {
        setBlockConfirmationMessageId(null);
    };

    async function handleBlockUser(usernameToBlock) {

        axios.post(`http://localhost:8000/api/v1/users/me/block/${usernameToBlock}`, {}, config)
            .then(response => {
                console.log('User blocked:', response.data);
            })
            .catch(error => {
                console.error('Error blocking user:', error);
            });

        setBlockConfirmationMessageId(null);
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
        axios.get(`http://localhost:8000/api/v1/messages/unread`, config)
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


    async function handleFullComment(message1) {
        <Link
            className="comment-link"
            to={`/comments/${message1.post}/${message1.title.toLowerCase().replace(/ /g, "-")}`}
        />
    };


    ////////////////////////


    return (
        <div>
            {allMessages.map((message, index) => {
                if (allMessages.length === index + 1) {
                    return (
                        <div ref={lastMessageElementRef} className="message-container" key={message._id} >
                            <h2 onClick={() => navigate(`/user/${message.from.username}`)} style={{ textDecoration: 'underline' }}>From: {message.from.username}</h2>
                            <h3>To: {message.to.username}</h3>
                            <h3>Subject: {message.subject}</h3>
                            <h4>Message: {message.message}</h4>
                            <h5 className="message-time"> {new Date(message.createdAt).toLocaleString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</h5>

                            <div className="button-container-in-messageRecived">
                                {message.subject.includes('username mention') && <button onClick={() => handleFullComment(message)}>Full comment</button>}
                                <button onClick={() => handleDelete(message._id)}>Delete</button>
                                {blockConfirmationMessageId !== message._id ? (
                                    <button onClick={() => handleBlockButtonClick(message._id)}>Block</button>
                                ) : (
                                    <div>
                                        <p className="Are_you_sure_label">Are you sure you want to block?</p>
                                        <button className='yes_Button' onClick={() => handleBlockUser(message.from.username)}>Yes</button>
                                        <button onClick={handleCancel}>No</button>
                                    </div>
                                )}

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
                            <h2 onClick={() => navigate(`/user/${message.from.username}`)} style={{ textDecoration: 'underline' }}>From: {message.from.username}</h2>
                            <h3>To: {message.to.username}</h3>
                            <h3 className="subject-Message">Subject: {message.subject}</h3>
                            <p className="message-text">Message: {message.message}</p>
                            <h5 className="message-time"> {new Date(message.createdAt).toLocaleString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</h5>
                            <div className="button-container-in-messageRecived">
                                {message.subject.includes('username mention') && <button onClick={() => handleFullComment(message)}>Full comment</button>}
                                <button onClick={() => handleDelete(message._id)}>Delete</button>
                                {blockConfirmationMessageId !== message._id ? (
                                    <button onClick={() => handleBlockButtonClick(message._id)}>Block</button>
                                ) : (
                                    <div>
                                        <p className="Are_you_sure_label">Are you sure you want to block?</p>
                                        <button className='yes_Button' onClick={() => handleBlockUser(message.from.username)}>Yes</button>
                                        <button onClick={handleCancel}>No</button>
                                    </div>
                                )}
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

