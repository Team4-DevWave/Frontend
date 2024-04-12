// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';


// function All() {


//     const [allMessages, setallMessages] = useState([]);

//     const [page, setPage] = useState(1); // initial page
//     const limit = 10; // or whatever limit you want

//     let bearerToken = Cookies.get('token');
//     const config = {
//         headers: { Authorization: `Bearer ${bearerToken}` },
//         params: { page: page, limit: limit },

//     };

//     useEffect(() => {
//         axios.get('http://localhost:8000/api/v1/messages/inbox',config)
//             .then(response => {
//                 setallMessages(response.data.data.messages);
//                 console.log('allMessages:', response.data);

//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     }, [page]);
//     const handleNextPage = () => {
//         setPage(prevPage => prevPage + 1); // increment page by 1
//     };

//     return (
//         <div>

//             <div >
//                 {Array.isArray(allMessages) && Object.values(allMessages).map((message, index) => (
//                     <div className="message-container" key={index}>
//                         <h2>From: {message.from}</h2>
//                         <h3>To: {message.to}</h3>
//                         <h3>Subject: {message.subject}</h3>
//                         <h4>{message.message}</h4>
//                     </div>
//                 ))}
//             </div>
//             <button onClick={handleNextPage}>Next Page</button>
//         </div>
//     );
// }

// export default All;


import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function All() {
    const [allMessages, setAllMessages] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); // new state variable

    const limit = 10;

    let bearerToken = Cookies.get('token');
    const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },
        params: { page: page, limit: limit },
    };

    const observer = useRef();
    const lastMessageElementRef = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) { 
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [hasMore]); 

    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/messages/inbox', config)
            .then(response => {
                setAllMessages(prevMessages => [...prevMessages, ...response.data.data.messages]);
                console.log('allMessages:', response.data);
                setHasMore(response.data.data.messages.length > 0); 
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [page]);

    return (
        <div>
            <div>
                {Array.isArray(allMessages) && allMessages.map((message, index) => {
                    if (allMessages.length === index + 1) {
                        return <div ref={lastMessageElementRef} key={index} className="message-container">
                            <h2>From: {message.from}</h2>
                            <h3>To: {message.to}</h3>
                            <h3>Subject: {message.subject}</h3>
                            <h4>{message.message}</h4>
                        </div>
                    } else {
                        return <div key={index} className="message-container">
                            <h2>From: {message.from}</h2>
                            <h3>To: {message.to}</h3>
                            <h3>Subject: {message.subject}</h3>
                            <h4>{message.message}</h4>
                        </div>
                    }
                })}
            </div>
        </div>
    );
}

export default All;