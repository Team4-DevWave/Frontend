import axios from 'axios';
import { useEffect, useState } from 'react';
import './Messages.css';

function Unread() {
    const [UnreadMessage, setUnreadMessage] = useState([]);

    useEffect(() => {
        fetchMessage();
    }, []);

    const fetchMessage = () => {
        axios.get('http://localhost:3002/send')
            .then(response => {
                setUnreadMessage(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleMessageClick = async (message) => {
        await axios.put(`http://localhost:3002/send/${message.id}`, { ...message, read: true });
        fetchMessage();
    };

    const UnreadMessageFiltered = UnreadMessage.filter(UnreadMessage => !UnreadMessage.read);

    return (
        <div>
            <div className="header">
                <div className="horizontalLine"></div>
            </div>
            {UnreadMessageFiltered.length === 0 && <p>There doesn't seem to be anything here</p>}
            {UnreadMessageFiltered.map((message, index) => (
                <div className="message-container" key={index} onClick={() => handleMessageClick(message)}>
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