import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom'; 
import Notification from "./Notification";

function NotificationNav() 
{
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
                <Tab label="Notifications" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Link to="/messages" style={{ textDecoration: 'none', color: 'inherit' }}>
                <Tab label="Messages" sx={{ textTransform: 'none', fontWeight: 'bold', fontSize: 'var(--font-medium)', '&:hover': { color: 'var(--color-black)' } }} />
                </Link>

            </Tabs>
            <div class="horizontalLine"></div>

            {activeNavItem === 0 && <Notification />}
        </>
    );

}

export default NotificationNav;











 

    