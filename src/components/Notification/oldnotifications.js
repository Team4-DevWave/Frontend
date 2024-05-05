import React, { useState, useEffect } from "react";
import axios from 'axios'; // Import axios
import "../../pages/Notification/notification.css"; // Import the CSS file
import {Meta} from '@storybook/react';
import propTypes from 'prop-types';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
// Import the images
import commentImage from "../../images/comment.png";
import messageImage from "../../images/message.png";
import chatImage from "../../images/chat.png";
import friendRequestImage from "../../images/friendRequest.png";
import newPostImage from "../../images/newPost.png";
import reportImage from "../../images/report.png";

const OldNotification = ({setNotificationCount}) => {
    const navigate = useNavigate();
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
            case "post":
                return newPostImage;


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
                        newData[index].status = "false";
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

    const handleNotificationClick = (notification) => {
        markAsRead(data.indexOf(notification));

// Redirect to the appropriate page based on the notification type
        switch (notification.type) {
            case "comment":

                navigate(`/comments/${notification.contentID.id}/${notification.contentID.title}`);
                break;

            case  "mention":

                navigate(`/comments/${notification.contentID.id}/${notification.contentID.title}`);

                break;

            case "message":
                navigate(`/messages/`);
                break;
            case"post":
                navigate(`/comments/${notification.contentID.id}/${notification.contentID.title}`);
                break;

            case "friendRequest":
                break;

            case "follow":
                break;

        }
    }

    return (
        //check
        <div>
            {/* Display the received data */}
            {data.map((notification, index) => (
                notification.read &&(
                    <div key={index} className={`notification`}  onClick={() => handleNotificationClick(notification)}>
                        <img
                            src={getImage(notification.type)}
                            alt={notification.type}
                            className="notification-icon"
                        />
                        <div>
                            {/*json { "status": "", [ "timestamp": "", "username": "", "subreddit": "", "type": "", "body": "" ] }*/}
                            {(() => {
                                switch (notification.type) {
                                    case 'comment':
                                        return (
                                            <>
                                                <h3>Comment Notification</h3>
                                                <p>{notification.content}</p>
                                                <p>{notification.contentID.title}</p>
                                            </>
                                        );
                                    case 'message':
                                        return (
                                            <>
                                                <h3>Message Notification</h3>
                                                <p>{notification.content}</p>
                                            </>
                                        );
                                    case 'chat':
                                        return (
                                            <>
                                                <h3>Chat Notification</h3>
                                                <p>{notification.content}</p>
                                            </>
                                        );
                                    case 'friendRequest':
                                        return (
                                            <>
                                                <h3>Friend Request Notification</h3>
                                                <p>{notification.content}</p>
                                            </>
                                        );
                                    case 'newPost':
                                        return (
                                            <>
                                                <h3>New Post Notification</h3>
                                                <p>{notification.content}</p>
                                            </>
                                        );
                                    case 'report':
                                        return (
                                            <>
                                                <h3>Report Notification</h3>
                                                <p>{notification.content}</p>
                                            </>
                                        );
                                    case 'upvote':
                                        return (
                                            <>
                                                <h3>Upvote Notification</h3>
                                                <p>{notification.content}</p>
                                            </>
                                        );
                                    case 'follow':
                                        return (
                                            <>
                                                <h3>Follow Notification</h3>
                                                <p>{notification.content}</p>
                                            </>
                                        );
                                    case 'mention':
                                        return (
                                            <>
                                                <h3>Comment Notification</h3>
                                                <p>{notification.content}</p>
                                                <p>{notification.contentID.title}</p>
                                            </>
                                        );
                                    case 'post':
                                        return (
                                            <>
                                                <h3>Post Notification</h3>
                                                <p>{notification.content}</p>
                                                <p>{notification.contentID.title}</p>
                                            </>
                                        );
                                    default:
                                        return null;
                                }
                            })()}
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

export default OldNotification;

OldNotification.propTypes = {
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