import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Messages.css';

function MentionedUsername() {
    const [mentions, setMentions] = useState([]);

    const mention1 = {
        user: 'essam',
        postTitle: 'video game',
        mentionText: 'Hello, I mentioned you in my post'
    };

    useEffect(() => {
        const url = 'http://localhost:3002/mention';
    
        const fetchMentions = async () => {
            try {
                const response = await axios.get(url);
                setMentions(response.data);
            } catch (error) {
                console.error('Failed to fetch mentions:', error);
            }
        };
    
        fetchMentions();
    
        const intervalId = setInterval(fetchMentions, 30000);
    
        return () => clearInterval(intervalId);
    }, []); 


    const handleClick =async (sendMention) => {
        try {
            const response = await axios.post('http://localhost:3002/mention', sendMention);
    
            if (response.status === 200) {
                console.log('Mention sent successfully');
            }
        } catch (error) {
            console.error('Failed to send mention22:', error);
        }
    };

    const handleFullComments = (mention) => {
        console.log('Full comments for:', mention);
        // Add your code to handle full comments here
    };
    const handleContext = (mention) => {
        console.log('Full comments for:', mention);
        // Add your code to handle full comments here
    };
    const handleReport = (mention) => {
        console.log('Full comments for:', mention);
        // Add your code to handle full comments here
    };
    const handleBlockUser = (mention) => {
        console.log('Full comments for:', mention);
        // Add your code to handle full comments here
    };
    const handleMarkUnread = (mention) => {
        console.log('Full comments for:', mention);
        // Add your code to handle full comments here
    };
    const handleReply = (mention) => {
        console.log('Full comments for:', mention);
        // Add your code to handle full comments here
    };


    return (
        <div>
            {mentions.map((mention, index) => (
                <div className="message-container" key={index}>
                       {mention && (
                    <>
                        <p>{mention.user} mentioned you in a post titled "{mention.postTitle}"</p>
                        <div className="button-container-in-messageRecived">

                        <button onClick={() => handleContext(mention)}>Context</button>
                        <button onClick={() => handleFullComments(mention)}>Full comments</button>
                        <button onClick={() => handleReport(mention)}>Report</button>
                        <button onClick={() => handleBlockUser(mention)}>Block User</button>
                        <button onClick={() => handleMarkUnread(mention)}>Mark Unread</button>
                        <button onClick={() => handleReply(mention)}>Reply</button>
                    </div>
                    </>
                    
                )}

                </div>
                
            ))}
                           <button onClick={() => handleClick(mention1)}>Click me</button>

        </div>
    );
}

export default MentionedUsername;
