import React, { useState, useEffect } from "react";
import axios from 'axios'; // Import axios
import "../../pages/Notification/notification.css"; // Import the CSS file
import {Meta} from '@storybook/react';
import propTypes from 'prop-types';
import Cookies from 'js-cookie';
import { useMediaQuery } from '@mui/material';
import {useNavigate} from 'react-router-dom';
// Import the images
import commentImage from "../../images/comment.png";
import messageImage from "../../images/message.png";
import chatImage from "../../images/chat.png";
import friendRequestImage from "../../images/friendRequest.png";
import newPostImage from "../../images/newPost.png";
import reportImage from "../../images/report.png";

const OldNotification = ({setNotificationCount}) => {
    const isMobile = useMediaQuery('(max-width: 1142px)');
    const navigate = useNavigate();
    const [data, setData] = useState([]); // State variable to store received data
    const [unreadCount, setUnreadCount] = useState(0); // State variable to store count of unread notifications

    useEffect(() => {
        const bearerToken = Cookies.get('token');
        const config = {
            headers: { Authorization: `Bearer ${bearerToken}` },
        };
        axios.get('https://www.threadit.tech/api/v1/notifications', config)
            .then(response => {
                setData(response.data.data.notifications);
                setNotificationCount(response.data.data.notifications.length);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    // Function to get the image based on the notification type
    const getImage = (type, notification) => {
        switch (type) {
            case "comment":
                return commentImage;
            case "message":
                return  messageImage;
            case "chat":
                return chatImage;
            case "friendRequest":
                return friendRequestImage;
            case "newPost":
                return  newPostImage;
            case "report":
                return reportImage;
            case "upvote":
                return newPostImage;
            case "follow":
                return  friendRequestImage;
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

        axios.patch(`https://www.threadit.tech/api/v1/notifications/hide/${notificationId}`, {}, config)
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

        axios.patch(`https://www.threadit.tech/api/v1/notifications/read/${notificationId}` ,{}, config)
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
        axios.get('https://www.threadit.tech/api/v1/notifications', config)
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
                navigate(`/user/${notification.contentID.username}`);
                break;

            case "follow":
                navigate(`/user/${notification.contentID.username}`);
                break;

        }
    };

    return (
        //check
        <div style={{

            //     moving to rightside of the screen because of side bar in case of desktop onlt
            display: 'center',
            objectPosition: 'center',
            margin: isMobile ? '0' : '0 0 300px 300px', // Adjust this value as needed
            width :isMobile ? '100%' : 'calc(100% - 500px)', // Adjust this value as needed

        }}>

            {/* Display the received data */}
            {data.length>0?data.map((notification, index) => (
                    notification.read &&(
                        <div key={index} className={`notification`}  onClick={() => handleNotificationClick(notification)}
                             style={{
                                 margin: '10px',
                                 padding: '10px',
                                 borderRadius: '10px',
                                 boxShadow: '0 0 10px rgba(0,0,0,0.1)', // Add some shadow for a modern look
                                 transition: 'all 0.3s ease', // Add transition for smooth animation
                                 ':hover': {
                                     transform: 'scale(1.02)', // Add scale animation on hover
                                     boxShadow: '0 0 20px rgba(0,0,0,0.2)', // Increase shadow on hover
                                 }
                             }}
                        >
                            <table>
                                <tr>
                                    <td>
                                        <img
                                            alt={getImage(notification.type, notification)}
                                            src={getImage(notification.type, notification)}
                                            className="notification-icon"
                                        />
                                    </td>
                                    <td>
                                        <div>
                                            {/*json { "status": "", [ "timestamp": "", "username": "", "subreddit": "", "type": "", "body": "" ] }*/}
                                            {(() => {
                                                switch (notification.type) {
                                                    case 'comment':
                                                        return (
                                                            <>
                                                                <h3>Comment Notification</h3>
                                                                <h6>{notification.contentID.title}</h6>
                                                                <p>{notification.content}</p>

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
                                                                <h6>{notification.contentID.title}</h6>
                                                                <p>{notification.content}</p>

                                                            </>
                                                        );
                                                    case 'post':
                                                        return (
                                                            <>
                                                                <h3>Post Notification</h3>
                                                                <h6>{notification.contentID.title}</h6>
                                                                <p>{notification.content}</p>

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
                                    </td>
                                </tr>
                            </table>
                        </div>
                    )
                ))
                :(
                    <p>No available Notifications
                    </p>
                )
            }
        </div>

    );
};

export default OldNotification;

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