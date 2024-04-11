import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Messages.css';
let currentId = 1;
function MentionedUsername() {
    const [mentions, setMentions] = useState([]);

    const [showConfirmation, setShowConfirmation] = useState(null);


    const mention1 = {
        id: currentId.toString(),
        userName: 'essam',
        postTitle: 'video game',
        mentionText: 'Hello, I mentioned you in my post',
        read: false
    };

    useEffect(() => {
        const fetchMentions = async () => {
            try {
                const response = await axios.get('http://localhost:3002/mention');
                setMentions(response.data);
            } catch (error) {
                console.error('Failed to fetch mentions:', error);
            }
        };

        fetchMentions();

        const intervalId = setInterval(fetchMentions, 30000);

        return () => clearInterval(intervalId);
    }, []);


    const handleClick = async (sendMention) => {
        try {
            const response = await axios.post('http://localhost:3002/mention', sendMention);
            console.log('currentId', currentId.current);
            currentId++;
            mention1.userName+=1;
            if (response.status === 200) {

                console.log('currentId', currentId);
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
    const handleBlockUser = async (mention) => {
        console.log('mentionid :', mention.id);
        if (showConfirmation === mention.id) {
            try {
                await axios.put(`http://localhost:3002/users/${mention.userName}`);
                console.log(`User ${mention.userName} has been blocked.`);
                setShowConfirmation(null);
            } catch (error) {
                console.error('Failed to block user:', error);
            }
        } else {
            setShowConfirmation(mention.id);
        }
    };

    const handleMarkUnread = async (mention) => {
        console.log('Full comments for:', mention.id);
        try {
            await axios.patch(`http://localhost:3002/users/${mention.userName}`, { blocked: true });
        } catch (error) {
            console.error('Error marking mention as unread:', error);
        }
    };

    const handleReply = (mention) => {
    };


    return (
        <div>


            {mentions.map((mention, index) => (
                <div className="message-container" key={index}>
                    {mention && (
                        <>
                            <p>{mention.userName} mentioned you in a post titled "{mention.postTitle}"</p>
                            <div className="button-container-in-messageRecived">

                                <button onClick={() => handleContext(mention)}>Context</button>
                                <button onClick={() => handleFullComments(mention)}>Full comments</button>
                                <button onClick={() => handleReport(mention)}>Report</button>
                                <button onClick={() => handleBlockUser(mention)}>Block User</button>
                                <button onClick={() => handleMarkUnread(mention)}>Mark Unread</button>
                                <button onClick={() => handleReply(mention)}>Reply</button>
                                {showConfirmation === mention.id ? (
                                    <div>
                                        <>Do you want to block this user?</>
                                        <button className="confirmation-button" onClick={() => handleBlockUser(mention)}>Yes</button>
                                        <button onClick={() => setShowConfirmation(false)}>No</button>
                                    </div>
                                ) : (
                                    <button onClick={() => handleBlockUser(mention)}>Block User</button>
                                )}

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
