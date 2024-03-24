import React, { useState, useEffect } from "react";
import { Tabs, Tab, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import Notification from "./Notification";

function NotificationNav() {
  const [activeNavItem, setActiveNavItem] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0); // State variable to store notification count
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000"); // Replace with your server URL
    setSocket(newSocket);

    return () => newSocket.disconnect(); // Cleanup function on unmount
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("receiveNotification", () => {
        setNotificationCount((count) => count + 1); // Increment notification count
      });
    }
  }, [socket]);

  const handleTabChange = (event, newValue) => {
    setActiveNavItem(newValue);
  };

  return (
    <>
      <Tabs
        className="navList sizeLg"
        value={activeNavItem}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        left
      >
        <Tab
          label={
            <Badge
              color="primary"
              badgeContent={notificationCount}
              sx={{ color: "#000", backgroundColor: "#fff" }}
            >
              {" "}
              Notifications
            </Badge>
          }
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            fontSize: "var(--font-medium)",
            "&:hover": { color: "var(--color-black)" },
          }}
        />
        <Link
          to="/messages"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Tab
            label="Messages"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "var(--font-medium)",
              "&:hover": { color: "var(--color-black)" },
            }}
          />
        </Link>
      </Tabs>
      <div class="horizontalLine"></div>

      {activeNavItem === 0 && <Notification />}
    </>
  );
}

export default NotificationNav;
