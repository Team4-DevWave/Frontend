import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import sidebar from "../../layouts/Sidebar";
import Edited from './Edited';
import Removed from './Removed';
import Reported from './Reported';
import Unmoderated from './Unmoderated';

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
                centered
            >
                <Tab label="Edited" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="Removed" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="Reported" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="Unmoderated" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
            </Tabs>


            <div class="horizontalLine"></div>

            {activeNavItem === 0 && <Edited />}
            {activeNavItem === 1 && <Removed />}
            {activeNavItem === 2 && <Reported />}
            {activeNavItem === 3 && <Unmoderated />}
        </>
    );

}



MessagesNav.propTypes = {
    SendAPrivateMessageTab: PropTypes.string.isRequired,
    InboxTab: PropTypes.string.isRequired,
    SentTab: PropTypes.string.isRequired,
};



export default MessagesNav;
