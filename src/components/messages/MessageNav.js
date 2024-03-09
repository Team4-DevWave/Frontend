import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import SendMessage from "./SendMessages";
import Inbox from './inboxcomponent';
import SentMessage from './SentMessage';
import MentionedUsername from './MentionedUsername';
import Notifications from "./Notifications";

function MessagesNav() {
    const [activeNavItem, setActiveNavItem] = useState(0);

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
                <Tab label="Send Message" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="Inbox" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="sent" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="Mentioned Username" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="Notifications" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />

            </Tabs>
            <div class="horizontalLine"></div>

            {activeNavItem === 0 && <SendMessage />}
            {activeNavItem === 1 && <Inbox />}
            {activeNavItem === 2 && <SentMessage />}
            {activeNavItem === 3 && <MentionedUsername/>}
            {activeNavItem === 4 && <Notifications />}
            {/*{activeNavItem === 5 && <Safety />}*/}
            {/*{activeNavItem === 3 && <Feed />}*/}
            {/*{activeNavItem === 4 && <Notifications />}*/}
            {/*{activeNavItem === 5 && <Emails />}*/}
            {/*{activeNavItem === 6 && <Subscriptions />}*/}
            {/*{activeNavItem === 7 && <Chat />}*/}
        </>
    );

}

export default MessagesNav;
