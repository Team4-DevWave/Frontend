import React from 'react';
import { Switch } from '@mui/material';

function SettingItem({ title }) {
  return (
    <div className="settingsItem">
      <div>
        <h2 className="titleBody-2">{title}</h2>
      </div>
      <Switch defaultChecked sx={{ ml: 'auto' }}/>
    </div>
  );
}

function SectionHeader({ title }) {
  return (
    <div className='titleData'>
      <h2 className="titleDataItem">{title}</h2>
      <div className="horizontalLine horizontalLine-2"></div>
    </div>
  );
}

function Emails() {
  return (
    <div className="settingsBody">
      <h1 className='title titleBody'>Manage Emails</h1>
      <div className='settingsData'>
        <SectionHeader title="MESSAGES" />
        <SettingItem title="Private messages" />
        <SettingItem title="Chat requests" />
        
        <SectionHeader title="ACTIVITY" />
        <SettingItem title="New user welcome" />
        <SettingItem title="Comments on your posts" />
        <SettingItem title="Replies to your comments" />
        <SettingItem title="Upvotes on your posts" />
        <SettingItem title="Upvotes on your comments" />
        <SettingItem title="Username mentions" />
        <SettingItem title="New followers" />
        
        <SectionHeader title="NEWSLETTERS" />
        <SettingItem title="Daily Digest" />
        <div className="horizontalLine horizontalLine-2"></div>
        
        <SettingItem title="Unsubscribe from all emails" />
      </div>
    </div>
  );
}
export default Emails;
