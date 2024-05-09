import React, { useState, useEffect } from "react";
import { Tabs, Tab,Badge, useTheme, useMediaQuery, Box } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios'; // Import axios
import Notification from "./Notification";
import OldNotification from "./oldnotifications";
import Cookies from "js-cookie";

function NotificationNav() {
    const username =localStorage.getItem('username');
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [activeNavItem, setActiveNavItem] = useState(0);
    const [notificationCount, setNotificationCount] = useState(0); // State variable to store notification count
    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState([]); // State variable to store notifications
    useEffect(() => {
        console.log("Fetching notifications...");
        if (notifications.length > 0) {
            return;
        }
        // Fetch notifications from the server
        const bearerToken = Cookies.get('token');
        const config = {
            headers: { Authorization: `Bearer ${bearerToken}` },
        };
        axios.get("http://localhost:8000/api/v1/notifications",config) // Replace with your server URL
            .then(response => {
                // Update the notification count with the number of unread notifications
                axios.get('http://localhost:8000/api/v1/notifications', config)
                    .then(response => {
                        const notifications = response.data.data.notifications;
                        const filteredNotifications = notifications.filter(notification =>
                            !(notification.type === 'post' && notification.contentID.userID.username === username)
                        );
                        setNotificationCount(filteredNotifications.length);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });
    }, [notifications]);

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
                centered={isMobile ? false : true}
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons="auto"
            >
                <Tab
                    label={
                        !isLoading && notificationCount !== null && ( // Only display the count if it is not null and not loading
                            <Badge
                                color="primary"
                                badgeContent={notificationCount}
                                sx={{ color: "#000" }}
                            >
                                {" "}
                                Notifications
                            </Badge>
                        )
                    }
                    sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "var(--font-medium)",
                        "&:hover": { color: "var(--color-black)" },
                    }}
                />
                <Tab
                    label="Old Notifications"
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


            {activeNavItem === 0 && <Notification  />}
            {activeNavItem === 1 && <OldNotification />}

        </>
    );
}

export default NotificationNav;