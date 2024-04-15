import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Messages.css';


function Sent() {


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
    
        axios.get('https://www.threadit.tech/api/v1/messages/sent', config)
            .then(response => {
                if (response.data.data.messages.length > 0) {
                    const uniqueMessages = response.data.data.messages.reduce((unique, message) => {
                        return unique.some(m => m._id === message._id) ? unique : [...unique, message];
                    }, allMessages);
                    if (allMessages.length > 0 && allMessages[allMessages.length - 1]._id === response.data.data.messages[response.data.data.messages.length-1]._id) {
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
                            <h5 className="message-time"> {new Date(message.createdAt).toLocaleString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</h5>     
                        </div>
                    )
                } else {
                    return (
                        <div className="message-container" key={message._id}>
                            <h2>From: {message.from.username}</h2>
                            <h3>To: {message.to.username}</h3>
                            <h3>Subject: {message.subject}</h3>
                            <h4>Message: {message.message}</h4>
                            <h5 className="message-time"> {new Date(message.createdAt).toLocaleString([], { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</h5>     
                        </div>
                    )
                }
            })}
            
            <div>{loading && 'Loading...'}</div>
            <div>{!hasMore && 'End of messages'}</div>
            
        </div>
    );
}

export default Sent;

