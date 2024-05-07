import React, { useEffect } from "react";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import {Link, useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { set } from "lodash";
import Cookies from "js-cookie";
import commentImage from "../images/comment.png";
import messageImage from "../images/message.png";
import chatImage from "../images/chat.png";
import friendRequestImage from "../images/friendRequest.png";
import newPostImage from "../images/newPost.png";
import reportImage from "../images/report.png";
function NotificationDropDown() {
    const navigate = useNavigate();
    const [data, setData] = useState([]); // State variable to store received data
    const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const bearerToken = Cookies.get('token');
    const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },
    };
    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/notifications' , config)
            .then(response => {
                setNotifications(response.data.data.notifications);
                setNotificationCount(response.data.data.notifications.length);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
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
        const notificationId = notifications[index]._id; // Assuming each notification has an '_id' field
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
        markAsRead(notifications.indexOf(notification));

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
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
       
      >
        <NotificationsIcon />
      </IconButton>
      <Menu
        sx={{
          ".MuiPaper-root": {
            borderRadius: "16px",
          },
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
          <table>
              <tr>
                  <td>
        <Typography component="h4" variant="" sx={{ marginLeft: 2 }}>
          Notifications

        </Typography>
                  </td>
                  <td>
                      <Typography component="h4" variant="" sx={{ marginLeft: 2 }}>

                      <button
                style={{ marginLeft: "25px" }}
              onClick={() => navigate('/messages')}
          >
             Messages
          </button>
                        </Typography>
                  </td>
              </tr>
          </table>
          {notifications.filter(notification => !notification.read).slice(0,5).map((notification) => (
              <MenuItem onClick={() => handleNotificationClick(notification)}>
                  <Avatar alt={notification.alt} src={getImage(notification.type)} />
                  <p style={{ marginLeft: "2px", marginBottom: "0px" }}>
                      {(() => {
                          switch (notification.type) {
                              case 'comment':
                                  return (
                                      <>
                                          <h6>Comment Notification</h6>
                                          <p>{notification.content}</p>
                                          <p>{notification.contentID.title}</p>
                                      </>
                                  );
                              case 'message':
                                  return (
                                      <>
                                          <h6>Message Notification</h6>
                                          <p>{notification.content}</p>
                                      </>
                                  );
                              case 'chat':
                                  return (
                                      <>
                                          <h6>Chat Notification</h6>
                                          <p>{notification.content}</p>
                                      </>
                                  );
                              case 'friendRequest':
                                  return (
                                      <>
                                          <h6>Friend Request Notification</h6>
                                          <p>{notification.content}</p>
                                      </>
                                  );
                              case 'newPost':
                                  return (
                                      <>
                                          <h6>New Post Notification</h6>
                                          <p>{notification.content}</p>
                                      </>
                                  );
                              case 'report':
                                  return (
                                      <>
                                          <h6>Report Notification</h6>
                                          <p>{notification.content}</p>
                                      </>
                                  );
                              case 'upvote':
                                  return (
                                      <>
                                          <h6>Upvote Notification</h6>
                                          <p>{notification.content}</p>
                                      </>
                                  );
                              case 'follow':
                                  return (
                                      <>
                                          <h6>Follow Notification</h6>
                                          <p>{notification.content}</p>
                                      </>
                                  );
                              case 'mention':
                                  return (
                                      <>
                                          <h6>Comment Notification</h6>
                                          <p>{notification.content}</p>

                                      </>
                                  );
                              case 'post':
                                  return (
                                      <>
                                          <h6>Post Notification</h6>
                                          <p>{notification.content}</p>
                                          <p>{notification.contentID.title}</p>
                                      </>
                                  );
                              default:
                                  return null;
                          }
                      })()}
                  </p>
              </MenuItem>
        ))}
        <MenuItem onClick={handleClose}>
          <Link
            to="/Notification"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            See all Notifications
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}
export default NotificationDropDown;
