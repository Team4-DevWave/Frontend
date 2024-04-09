import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import Sent from './Sent';
import { PropTypes } from 'prop-types';
import Inbox from "./InboxBar";
import SendAPrivateMessage from './SendAPrivateMessage';
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
                <Tab label="Send A Private Message" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="Inbox" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="Sent" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
            </Tabs>
            

            <div class="horizontalLine"></div>

            {activeNavItem === 0 && <SendAPrivateMessage/>}
            {activeNavItem === 1 && <Inbox />}
            {activeNavItem === 2 && <Sent />}
        </>
    );

}



MessagesNav.propTypes = {
    SendAPrivateMessageTab: PropTypes.string.isRequired,
    InboxTab: PropTypes.string.isRequired,
    SentTab: PropTypes.string.isRequired,
  };
  
  

export default MessagesNav;
