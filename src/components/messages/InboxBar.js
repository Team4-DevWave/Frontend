import React, { useState } from 'react';
import { Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import All from './All';
import Unread from './Unread';
import MessageRecived from './MessageRecived';
import MentionedUsername from './MentionedUsername';   
import PostReplies from './PostReplies';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Badge } from '@mui/material';
function InboxBar() {
    const [activeNavItem, setActiveNavItem] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    let bearerToken = Cookies.get('token');
    const config = {
        headers: { Authorization: `Bearer ${bearerToken}` },

    };

    useEffect(() => {
        console.log(config)
        console.log("Fetching notifications..." ,notificationCount);
        if (notifications.length > 0) {
            return;
        }
        axios.get("http://localhost:8000/api/v1/messages/unread",config) // Replace with your server URL

            .then(response => {
                // Update the notification count with the number of unread notifications
                console.log("want to fetch data ")
                setNotifications( response.data.data.messages);
                console.log("notifications ismail123456",notifications);
                setNotificationCount(notifications.length);
            })
            .catch(error => {
                console.error("Error fetching notifications: ", error);
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
                variant={isMobile ? "scrollable" : "standard"}
                scrollButtons={isMobile ? "auto" : "off"}
            >
                <Tab label="All" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab
                    label={
                         notificationCount !== null && ( // Only display the count if it is not null and not loading
                            <Badge
                                color="primary"
                                badgeContent={notificationCount}
                                sx={{ color: "#000" }}
                            >
                                {" "}
                                Unread
                            </Badge>
                        )
                    }
                    sx={{
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "var(--font-medium)",
                        "&:hover": { color: "var(--color-black)" },
                    }}
                />                <Tab label="Messages" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="Post Replies" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="Username Mentions" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
            </Tabs>

            <div class="horizontalLine"></div>

            {activeNavItem === 0 && <All />}
            {activeNavItem === 1 && <Unread />}
            {activeNavItem === 2 && <MessageRecived/>}
            {activeNavItem === 3 && <PostReplies/>}
            {activeNavItem === 4 && <MentionedUsername />}
        </>
    );
}

export default InboxBar;