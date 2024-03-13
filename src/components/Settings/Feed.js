import React from 'react';
import { Switch } from '@mui/material';
import ContentSort from './Feed/ContentSort';

function SettingsItem({ title, description }) {
  return (
    <div className="settingsItem">
      <div>
        <h2 className="titleBody-2">{title}</h2>
        <p className='settingsParagraph'>{description}</p>
      </div>
      <Switch defaultChecked sx={{ ml: 'auto' }} />
    </div>
  );
}

function Feed() {
  return (
    <div className="settingsBody">
      <h1 className='title titleBody'>Feed settings</h1>
      <div className='settingsData'>

        <div className='titleData'>
          <h2 className="titleDataItem">CONTENT PREFERENCES</h2>
          <div className="horizontalLine horizontalLine-2"></div>
        </div>

        <SettingsItem
          title="Enable home feed recommendations"
          description="Allow us to introduce recommended posts in your home feed."
        />
        <SettingsItem
          title="Autoplay media"
          description="Play videos and gifs automatically when in the viewport."
        />
        <SettingsItem
          title="Reduce Animations"
          description="Reduce animations on posts, comments, and feeds."
        />
        <SettingsItem
          title="Community themes"
          description="Use custom themes for all communities. You can also turn this off on a per community basis."
        />

        <ContentSort />

        <SettingsItem
          title="Open posts in new tab"
          description="Enable to always open posts in a new tab."
        />

        <div className='titleData'>
          <h2 className="titleDataItem">POST PREFERENCES</h2>
          <div className="horizontalLine horizontalLine-2"></div>
        </div>

        <SettingsItem
          title="Default to markdown"
          description="When posting, your input will default to markdown text instead of fancy pants."
        />
      </div>
    </div>
  );
}

export default Feed;
