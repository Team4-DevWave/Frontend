import React, { useState, useEffect } from "react";
import { Tabs, Tab,Badge, useTheme, useMediaQuery, Box } from '@mui/material';
import { Link } from "react-router-dom";
import axios from 'axios'; // Import axios
import Notification from "./Notification";
import OldNotification from "./oldnotifications";
import Cookies from "js-cookie";

function NotificationNav() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [activeNavItem, setActiveNavItem] = useState(0);
    const [notificationCount, setNotificationCount] = useState(0); // State variable to store notification count
    const [isLoading, setIsLoading] = useState(true);
    const [notifications, setNotifications] = useState([]); // State variable to store notifications
    const [unreadMessageCount, setUnreadMessageCount] = useState(0);
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
        axios.get("https://www.threadit.tech/api/v1/notifications",config) // Replace with your server URL

            .then(response => {
                // Update the notification count with the number of unread notifications
                const unreadNotifications = response.data.data.notifications.filter(notification => !notification.read);
                setNotificationCount(unreadNotifications.length);
                setNotifications(response.data.data.notifications); // Store notifications in state
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching notifications: ", error);
                setIsLoading(false);
            });
    }, [notifications]);

    useEffect(() => {
        const bearerToken = Cookies.get('token');
        const config = {
            headers: { Authorization: `Bearer ${bearerToken}` },
        };
        axios.get("https://www.threadit.tech/api/v1/messages/unread", config)
            .then(response => {
                setUnreadMessageCount(response.data.data.messages.length);
            })
            .catch(error => {
                console.error("Error fetching unread messages: ", error);
            });
    }, []);

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
                        label={
                            <Badge
                                color="primary"
                                badgeContent={unreadMessageCount}
                                sx={{ color: "#000" }}
                            >
                                {" "}
                                Messages
                            </Badge>
                        }
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