import React from 'react';
import {  Switch } from '@mui/material';

function ProfileCategory() {
  return (
    <>
      <div className='titleData'>
        <h2 className="titleDataItem">PROFILE CATEGORY</h2>
        <div className="horizontalLine horizontalLine-2"></div>
      </div>
    <div className="settingsItem">
      <div>
        <h2 className="titleBody-2">NSFW</h2>
        <p className="settingsParagraph">This content is NSFW (may contain nudity, pornography, profanity or inappropriate content for those under 18)</p>
      </div>
      <Switch defaultChecked sx={{ ml: 'auto' }} />
    </div>
    </>
  );
}

export default ProfileCategory;
