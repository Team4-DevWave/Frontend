import React, { useState } from 'react';
import { Tabs, Tab, useMediaQuery, useTheme } from '@mui/material';
import Account from './Account';
import Profile from './Profile';
import Safety from './Safety';
import Feed from './Feed';
import Notifications from './Notifications';
import Emails from './Emails';
import Chat from './Chat';
    
function SettingsNav() {
  const [activeNavItem, setActiveNavItem] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setActiveNavItem(newValue);
  };

  
  return (
<>
    <Tabs
    className="settingsNavTabs"  
    value={activeNavItem}
    onChange={handleTabChange}
    variant={isMobile ? "scrollable" : "standard"}
      indicatorColor="primary"
      textColor="primary"
      left 
    >
      <Tab label="Account" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-small)','&:hover': {color: 'var(--color-black)',} }} />
      <Tab label="Profile" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-small)','&:hover': {color: 'var(--color-black)',} }} />
      <Tab label="Safety & Privacy" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-small)','&:hover': {color: 'var(--color-black)',} }} />
      <Tab label="Feed Settings" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-small)','&:hover': {color: 'var(--color-black)',} }} />
      <Tab label="Notifications" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-small)','&:hover': {color: 'var(--color-black)',} }} />
      <Tab label="Emails" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-small)','&:hover': {color: 'var(--color-black)',} }} />
      <Tab label="Chat & Messaging" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--font-small)','&:hover': {color: 'var(--color-black)',} }} />
    </Tabs>
        <div class="horizontalLine"></div>

      {activeNavItem === 0 && <Account />}
      {activeNavItem === 1 && <Profile />}
      {activeNavItem === 2 && <Safety />}
      {activeNavItem === 3 && <Feed />}
      {activeNavItem === 4 && <Notifications />}
      {activeNavItem === 5 && <Emails />}
      {activeNavItem === 6 && <Chat />}
  </>
  );

}

export default SettingsNav;
