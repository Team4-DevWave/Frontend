import React from 'react';
import '../../pages/messages/messages.css';
import axios from 'axios';
import Sent from './Sent';
function SendAPrivateMessage() {
    const SendMessage = async (event) => {
        event.preventDefault();

        const from = event.target.elements.from.value;
        const to = event.target.elements.to.value;
        const subject = event.target.elements.subject.value;
        const message = event.target.elements.message.value;
        const read = false;
        
        try {
            const response = await axios.post('http://localhost:3001/send', {  from, to, subject, message,read });
            alert('Message sent successfully');

        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };
    return (
        <div className="container">
            <form className="SendMessageform" onSubmit={SendMessage}>

                <label htmlFor="from">From:</label>
                <select id="from" name="from"> 
                    <option value="user1">User 1</option>
                    <option value="user2">User 2</option>
                </select>
                <label htmlFor="to">To:</label>
                <input type="text" id="to" name="to" required />

                <label htmlFor="subject">Subject:</label>
                <input type="text" id="subject" name="subject" required />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" required></textarea>

                <input type="submit" value="Send Message" />

            </form>
        </div>

    );
}
export default SendAPrivateMessage;



