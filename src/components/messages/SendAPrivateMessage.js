import React from 'react';
import '../../pages/messages/messages.css';
import axios from 'axios';

function SendAPrivateMessage() {
    const SendMessage = async (event) => {
        event.preventDefault();

        const from = event.target.elements.from.value;
        const to = event.target.elements.to.value;
        const subject = event.target.elements.subject.value;
        const message = event.target.elements.message.value;
    // const message = {user:"user 1", to:"user 2", subject:"subject", Message:"message"};
        
        try {
            console.log( { to,subject,message });
            const response = await axios.post('http://localhost:3001/posts', {  from, to, subject, message });
            alert('Message sent successfully');

        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };
    return (
        <div className="container">
            <form className="SendMessageform" onSubmit={SendMessage}>

                <label htmlFor="from">From:</label>
                <select id="from" name="from"> {/* select tag is for drop down */}
                    <option value="user1">User 1</option>
                    <option value="user2">User 2</option>
                    {/* Add more options as needed */}
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



