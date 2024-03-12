import React from 'react';
import {  Switch } from '@mui/material';
import Button from '@mui/material/Button';

function AdvancedSettings() {
  return (
    <>
          <div className='titleData'>
        <h2 className="titleDataItem">ADVANCED</h2>
        <div className="horizontalLine horizontalLine-2"></div>
      </div>

    <div className="settingsItem">
      <div>
        <h2 className="titleBody-2">Allow people to follow you</h2>
    <p >
      Posts to this profile can appear in{' '}
      <span className="link">
        <a target="_blank" href='https://www.reddit.com/r/all/' rel="noreferrer"> r/all </a>
      </span>{' '}
      and your profile can be discovered{' '}
      <span className="link">
        <a target="_blank" href='https://www.reddit.com/users' rel="noreferrer"> in /users </a>
      </span>{' '}
    </p>

      </div>
      <Switch defaultChecked sx={{ ml: 'auto' }}/>
    </div>
    <div className="settingsItem">
      <div>
        <h2 className="titleBody-2">Content visibility</h2>
        <p className="settingsParagraph">Followers will be notified about posts you make to your profile and see them in their home feed.</p>
      </div>
      <Switch defaultChecked sx={{ ml: 'auto' }}/>
    </div>
    <div className="settingsItem">
      <div>
        <h2 className="titleBody-2">Active in communities visibility</h2>
        <p className="settingsParagraph">Show which communities I am active in on my profile.</p>
      </div>
      <Switch defaultChecked sx={{ ml: 'auto' }}/>
    </div>
    <div className="settingsItem">
      <div>
        <h2 className="titleBody-2">Clear history</h2>
        <p className="settingsParagraph">Delete your post views history.</p>
      </div>
      <Button
      sx={{
        color: "var(--color-blue)",
        fontWeight: "bold",
        fontSize: "var(--font-medium)",
        textTransform: 'none',
        padding: '5px 15px',
        borderRadius: '10rem',
        border: '1px solid var(--color-blue)',
        ml: 'auto',
          '@media screen and (max-width: 1000px)': {
        fontSize: "var(--font-very-small)",
        },
      }}>Clear history </Button>

    </div>
          <div className='titleData'>
        <h2 className="titleDataItem">PROFILE MODERATION</h2>
        <div className="horizontalLine horizontalLine-2"></div>
        <p>For moderation tools please visit our {' '}<span className="link">
        <a target="_blank" href='https://www.reddit.com/user/Ok_Operation_7782/about/edit/moderation' rel="noreferrer">Profile Moderation page</a>
      </span>{' '}</p>
      </div>
    </>
  );
}

export default AdvancedSettings;