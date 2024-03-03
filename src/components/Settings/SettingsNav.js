import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';

function SettingsNav() {
  const [activeNavItem, setActiveNavItem] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveNavItem(newValue);
  };

  return (

    <Tabs
    className="navList"  
    value={activeNavItem}
      onChange={handleTabChange}
      indicatorColor="primary"
      textColor="primary"
      left 
    >
      <Tab label="Account" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--margin-top-medium)','&:hover': {color: 'var(--color-black)',} }} />
      <Tab label="Profile" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--margin-top-medium)','&:hover': {color: 'var(--color-black)',} }} />
      <Tab label="Safety & Privacy" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--margin-top-medium)','&:hover': {color: 'var(--color-black)',} }} />
      <Tab label="Feed Settings" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--margin-top-medium)','&:hover': {color: 'var(--color-black)',} }} />
      <Tab label="Notifications" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--margin-top-medium)','&:hover': {color: 'var(--color-black)',} }} />
      <Tab label="Emails" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--margin-top-medium)','&:hover': {color: 'var(--color-black)',} }} />
      <Tab label="Subscriptions" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--margin-top-medium)','&:hover': {color: 'var(--color-black)',} }} />
      <Tab label="Chat & Messaging" sx={{ textTransform: 'none', fontWeight:'bold', fontSize: 'var(--margin-top-medium)','&:hover': {color: 'var(--color-black)',} }} />
    </Tabs>
  );
}

export default SettingsNav;
