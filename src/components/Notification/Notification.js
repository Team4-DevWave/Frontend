import React, { useState, useEffect } from "react";
import axios from 'axios'; // Import axios
import "../../pages/Notification/notification.css"; // Import the CSS file
import {Meta} from '@storybook/react';
import propTypes from 'prop-types';
import Cookies from 'js-cookie';

// Import the images
import commentImage from "../../images/comment.png";
import messageImage from "../../images/message.png";
import chatImage from "../../images/chat.png";
import friendRequestImage from "../../images/friendRequest.png";
import newPostImage from "../../images/newPost.png";
import reportImage from "../../images/report.png";

const Notification = ({setNotificationCount}) => {
    const [data, setData] = useState([]); // State variable to store received data
    const [unreadCount, setUnreadCount] = useState(0); // State variable to store count of unread notifications

    useEffect(() => {
        const bearerToken = Cookies.get('token');
        const config = {
            headers: { Authorization: `Bearer ${bearerToken}` },
        };
        axios.get('http://localhost:8000/api/v1/notifications', config)
            .then(response => {
                setData(response.data.data.notifications);
                setNotificationCount(response.data.data.notifications.length);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

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
            case "upvote":
                return newPostImage;
            case "follow":
                return friendRequestImage;
            case "mention":
                return commentImage;


            default:
                return null;
        }
    };

    const markAsRead = (index) => {
        const notificationId = data[index]._id; // Assuming each notification has an '_id' field
        const bearerToken = Cookies.get('token');
        const config = {
            headers: { Authorization: `Bearer ${bearerToken}` },
        };

        axios.patch(`http://localhost:8000/api/v1/notifications/hide/${notificationId}`, {}, config)
            .then(response => {
                if (response.data.status == "success") {
                    // Mark the notification as read in the state
                    setData((oldData) => {
                        const newData = [...oldData];
                        newData[index].status = "flase";
                        return newData;
                    });

                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        axios.patch(`http://localhost:8000/api/v1/notifications/read/${notificationId}` ,{}, config)
            .then(response => {
                if (response.data.status == "success") {
                    // Mark the notification as read in the state
                    setData((oldData) => {
                        const newData = [...oldData];
                        newData[index].status = "true";
                        return newData;
                    });
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        axios.get('http://localhost:8000/api/v1/notifications', config)
            .then(response => {
                setData(response.data.data.notifications);
                setNotificationCount(response.data.data.notifications.length);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        //check
        <div>
            {/* Display the received data */}
            {data.map((notification, index) => (
                !notification.read &&(
                    <div key={index} className={`notification`}  onClick={() => markAsRead(index)}>
                        <img
                            src={getImage(notification.type)}
                            alt={notification.type}
                            className="notification-icon"
                        />
                        <div>
                            {/*json { "status": "", [ "timestamp": "", "username": "", "subreddit": "", "type": "", "body": "" ] }*/}

                            <h3>{notification.content}</h3>
                            <p>{notification.threadData}</p>
                            <p> {
                                // Create a new Date object with the timestamp
                                new Date(notification.createdAt).toISOString().slice(0,16).replace("T", " ")
                            }</p>

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