import React, { useState } from 'react';
import { Tabs, Tab, useTheme, useMediaQuery, Box } from '@mui/material';
import { PropTypes } from 'prop-types';
import Edited from './Edited';
import Removed from './Removed';
import ModerationRoles from './ModerationRoles';
import Unmoderated from './Unmoderated';

function ModNav() {
    const [activeNavItem, setActiveNavItem] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleTabChange = (event, newValue) => {
        setActiveNavItem(newValue);
    };

    return (
        <Box p={isMobile ? 1 : 2}
            sx={{  justifyContent: 'right' , margin: 'auto', paddingLeft: '0px', width: '100%'}}
        >
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
        </Box>
    );
}

export default ModNav;

ModNav.propTypes = {
    Edited: PropTypes.func,
    Removed: PropTypes.func,
    Reported: PropTypes.func,
    Unmoderated: PropTypes.func,
};
