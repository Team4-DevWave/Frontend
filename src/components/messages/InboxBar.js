import All from './All';
import Unread from './Unread';
import MessageRecived from './MessageRecived';
import commentReplies from './CommentReplies';
import MentionedUsername from './MentionedUsername';   
import postReplies from './PostReplies';
import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';


function InboxBar() {
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
                <Tab label="All" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="Unread" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="Messages" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="Comment Replies" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="Post Replies" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="Username Mentions" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />


            </Tabs>
            <div class="horizontalLine"></div>

            {activeNavItem === 0 && <All />}
            {activeNavItem === 1 && <Unread />}
            {activeNavItem === 2 && <MessageRecived/>}
            {activeNavItem === 3 && <commentReplies/>}
            {activeNavItem === 4 && <postReplies />}
            {activeNavItem === 5 && <MentionedUsername />}
        </>
    );
}

export default InboxBar;