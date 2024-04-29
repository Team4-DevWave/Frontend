import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import sidebar from "../../layouts/Sidebar";
import Edited from './Edited';
import Removed from './Removed';
import ModerationRoles from './ModerationRoles';
import Unmoderated from './Unmoderated';

function ModNav() {
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
                <Tab label="ModerationRoles" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
                <Tab label="Unmoderated" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-medium)','&:hover': {color: 'var(--color-black)',} }} />
            </Tabs>


            <div class="horizontalLine"></div>

            {activeNavItem === 0 && <Edited />}
            {activeNavItem === 1 && <Removed />}
            {activeNavItem === 2 && <ModerationRoles />}
            {activeNavItem === 3 && <Unmoderated />}
        </>
    );

}

export default ModNav;

ModNav.propTypes = {
    Edited: PropTypes.func,
    Removed: PropTypes.func,
    Reported: PropTypes.func,
    Unmoderated: PropTypes.func,
};




