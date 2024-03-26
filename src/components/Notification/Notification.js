import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "../../pages/Notification/notification.css"; // Import the CSS file

// Import the images
import commentImage from "../../images/comment.png";
import messageImage from "../../images/message.png";
import chatImage from "../../images/chat.png";
import friendRequestImage from "../../images/friendRequest.png";
import newPostImage from "../../images/newPost.png";
import reportImage from "../../images/report.png";

const Notification = () => {
  const [socket, setSocket] = useState(null);
  const [data, setData] = useState([]); // State variable to store received data

  useEffect(() => {
    const newSocket = io("http://localhost:4000"); // Replace with your server URL
    setSocket(newSocket);

   }, []);

  useEffect(() => {
    if (socket) {
      socket.on("receiveNotification", (receivedData) => {
        setData((oldData) => [...oldData, receivedData]); // Store received data in state variable
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

  return (

    <div>
      {/* Display the received data */}
      {data.map((notification, index) => (
        <div key={index} className={`notification`}>
          <img
            src={getImage(notification.type)}
            alt={notification.type}
            className="notification-icon"
          />
          <div>
            <h3 id={"datarecieved"}>Data received from server:</h3>
            <p id={"Username"}>UserName: {notification.userName}</p>
            <p id={"recepid"}>RecipientUserID: {notification.recipientUserId}</p>
            <p id={"senderemail"}>SenderUserEmail: {notification.senderUserEmail}</p>
            <p id={"senderid"}>SenderUserID: {notification.senderUserId}</p>
            <p id={"notificationtype"} >Type: {notification.type}</p>
            <p id={"threadid"}>ThreadID: {notification.threadID}</p>
            <p id={"threaddata"} >ThreadData: {notification.threadData}</p>
            <p id={"time"}>Timestamp: {notification.timestamp}</p>
            {/*<p>Is Read: {notification.isRead.toString()}</p>*/}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
