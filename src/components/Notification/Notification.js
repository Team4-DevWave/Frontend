import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../../pages/Notification/notification.css"; // Import the CSS file
import {Meta} from '@storybook/react';
import propTypes from 'prop-types';

// Import the images
import commentImage from "../../images/comment.png";
import messageImage from "../../images/message.png";
import chatImage from "../../images/chat.png";
import friendRequestImage from "../../images/friendRequest.png";
import newPostImage from "../../images/newPost.png";
import reportImage from "../../images/report.png";

const Notification = ({setNotificationCount}) => {
    const [socket, setSocket] = useState(null);
    const [data, setData] = useState([]); // State variable to store received data
    const [unreadCount, setUnreadCount] = useState(0); // State variable to store count of unread notifications

    useEffect(() => {
        const socketIo = io("http://localhost:8000/notifications");

        setSocket(socketIo);
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on("receiveNotification", (receivedData) => {
                setData((oldData) => [...oldData, receivedData]); // Store received data in state variable
                // setUnreadCount((prevCount) => prevCount + 1);
            });
            return ()=> socket.disconnect();
        }
    }, [socket]);

    // Function to get the image based on the notification type
    const getImage = (type) => {
        switch (type) {
            case "comment":
                return commentImage;
            case "message":
                return messageImage;
            case "chat":
                return chatImage;
            case "friendRequest":
                return friendRequestImage;
            case "newPost":
                return newPostImage;
            case "report":
                return reportImage;
            default:
                return null;
        }
    };

    const markAsRead = (index) => {
        const notificationId = data[index].id; // Assuming each notification has an 'id' field

        fetch('http://localhost:8000/hide_notification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ notification_id: notificationId }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'unread') {
                    // Mark the notification as read in the state
                    setData((oldData) => {
                        const newData = [...oldData];
                        newData[index].status = "read";
                        return newData;
                    });
                    setNotificationCount((prevCount) => prevCount - 1);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            {/* Display the received data */}
            {data.map((notification, index) => (
                !notification.isRead &&(
                    <div key={index} className={`notification`}  onClick={() => markAsRead(index)}>
                        <img
                            src={getImage(notification.type)}
                            alt={notification.type}
                            className="notification-icon"
                        />
                        <div>
                            {/*json { "status": "", [ "timestamp": "", "username": "", "subreddit": "", "type": "", "body": "" ] }*/}
                            <h3 id={"datarecieved"}>Data received from server:</h3>
                            <p>{notification.userName} has {notification.type}ed your post</p>
                            <p>{notification.threadData}</p>
                            <p>{notification.timestamp}</p>

                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default Notification;

Notification.propTypes = {
    /**
     * The type of notification
     */
    type: propTypes.oneOf(['comment', 'message', 'chat', 'friendRequest', 'newPost', 'report']),
    /**
     * The user name
     */
    userName: propTypes.string,
    /**
     * The recipient user ID
     */
    recipientUserId: propTypes.string,
    /**
     * The sender user email
     */
    senderUserEmail: propTypes.string,
    /**
     * The sender user ID
     */
    senderUserId: propTypes.string,
    /**
     * The thread ID
     */
    threadID: propTypes.string,
    /**
     * The thread data
     */
    threadData: propTypes.string,
    /**
     * The timestamp
     */
    timestamp: propTypes.string,
    /**
     * The read status
     */
    isRead: propTypes.string,
}