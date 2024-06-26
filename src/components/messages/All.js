import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from "prop-types";
import { Navigate, useNavigate } from 'react-router-dom';

import { Grid } from '@mui/material';
import './Messages.css';



function All() {

    const [allMessages, setallMessages] = useState([]);
    const [HideBlockButton, setHideBlockButton] = useState(false);
    const [page, setPage] = useState(1); // initial page
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;
    const [blockedUsers, setBlockedUsers] = useState({});
    const [blockConfirmationMessageId, setBlockConfirmationMessageId] = useState(null);
    

    const navigate = useNavigate();

    let bearerToken = Cookies.get('token');
    const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },
        params: { page: page, limit: limit },

    };

    const handleBlockButtonClick = (messageId) => {
        setBlockConfirmationMessageId(messageId);
    };

    useEffect(() => {
        setLoading(true);

        axios.get('http://localhost:8000/api/v1/messages/inbox', config)
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

    async function handleMarkUnread(message1) {
        axios.patch(`http://localhost:8000/api/v1/messages/${message1._id}/markread`, { read: !message1.read }, config)
            .then(response => {
                setallMessages(allMessages.map(message =>
                    message._id === message1._id ? { ...message, read: !message1.read } : message

                ));
                console.log('Message updated:', response.data);

            })
            .catch(error => {
                console.error('Error updating message:', error);

            }
            );
    };


    const handleFullComment = (message) => {
        // setShowLink(true);
        const postTitle = message.subject.split(': ')[1];
        navigate(`/comments/${message.post}/${postTitle}`);

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
                        <Grid className="messageGrid">
                            <div ref={lastMessageElementRef} className="message-container" key={message._id}>
                                <h2 onClick={() => navigate(`/user/${message.from.username}`)} style={{ textDecoration: 'underline' }}>From: {message.from.username}</h2>
                                <h3>To: {message.to.username}</h3>

                                <h4>Message: {message.message}</h4>
                                <h5 className="message-time"> {new Date(message.createdAt).toLocaleString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</h5>
                                <div className="button-container-in-messageRecived">
                                    {message.subject.includes('username mention') && <button onClick={() => handleFullComment(message)}>Full context</button>}
                                    <button onClick={() => handleDelete(message._id)}>Delete</button>
                                    {/*<button onClick={() => handleReport(message._id)}>Report</button>*/}
                                    {blockConfirmationMessageId !== message._id ? (
                                        <button onClick={() => handleBlockButtonClick(message._id)}>Block</button>
                                    ) : (
                                        <div>
                                            <p className="Are_you_sure_label">Are you sure you want to block?</p>
                                            <button className='yes_Button' onClick={() => handleBlockUser(message.from.username)}>Yes</button>
                                            <button onClick={handleCancel}>No</button>
                                        </div>
                                    )}
                                    <button onClick={() => handleMarkUnread(message)}>{message.read ? 'Mark Unread' : 'Mark Read'}</button>
                                </div>
                            </div>
                        </Grid>
                    )
                } else {
                    return (

                        <div className="message-container" key={message._id}>
                            <h2 onClick={() => navigate(`/user/${message.from.username}`)} style={{ textDecoration: 'underline' }}>From: {message.from.username}</h2>
                            <h3>To: {message.to.username}</h3>
                            {!message.subject.includes('username mention') && <h3>Subject: {message.subject}</h3>}
                            <h4>Message: {message.message}</h4>
                            <h5 className="message-time"> {new Date(message.createdAt).toLocaleString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</h5>
                            <div className="button-container-in-messageRecived">
                                {message.subject.includes('username mention') && <button onClick={() => handleFullComment(message)}>Full comment</button>}

                                <button onClick={() => handleDelete(message._id)}>Delete</button>
                                {/* <button onClick={() => handleReport(message._id)}>Report</button> */}
                                {blockConfirmationMessageId !== message._id ? (
                                    <button onClick={() => handleBlockButtonClick(message._id)}>Block</button>
                                ) : (
                                    <div>
                                        <p className="Are_you_sure_label">Are you sure you want to block?</p>
                                        <button className='yes_Button' onClick={() => handleBlockUser(message.from.username)}>Yes</button>
                                        <button onClick={handleCancel}>No</button>
                                    </div>
                                )}
                                <button onClick={() => handleMarkUnread(message)}>{message.read ? 'Mark Unread' : 'Mark Read'}</button>

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

export default All;

//JSDocs comments for Storybook

All.propTypes = {

    /** Handles Deletion of the selected message */
    Delete: PropTypes.func,
    /** Handles direct to the post */
    handleFullComment: PropTypes.func,
    /** Handles the block user of the selected message */
    handleBlockUser: PropTypes.func,
    /** Handles the MarkUnread of the selected message and when clicked flip to allow user to mark as read if want */
    handleMarkUnread: PropTypes.func,

};


