import React from 'react';
function MessageRecived({ sender, subject, message, timeSent }) {
    return (
        <div>
        <div className="message-details">
            <p className="message-lineHead"><strong>From:</strong> {sender}</p>
            <p className="message-line"><strong>Subject:</strong> {subject}</p>
            <p className="message-line"><strong>Message:</strong> {message || "There doesn't seem to be anything here"}</p>
            <p className="message-line"><strong>Sent:</strong> {timeSent}</p>
        </div>
    </div>
);
}
export default MessageRecived;

