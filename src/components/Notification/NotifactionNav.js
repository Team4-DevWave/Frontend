import React, { useState, useEffect } from "react";
import { Tabs, Tab, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import axios from 'axios'; // Import axios
import Notification from "./Notification";
import Cookies from "js-cookie";

function NotificationNav() {
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
                        !isLoading && notificationCount !== null && ( // Only display the count if it is not null and not loading
                            <Badge
                                color="primary"
                                badgeContent={notificationCount}
                                sx={{ color: "#000", backgroundColor: "#fff" }}
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

            {activeNavItem === 0 && <Notification setNotificationCount={setNotificationCount} />}
        </>
    );
}

export default NotificationNav;