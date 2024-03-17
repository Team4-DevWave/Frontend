import React, { useState } from 'react';
import MuteCommunities from './Safety/MuteCommunities';
import BlockedUsers from './Safety/BlockedUsers';
import Switches from './Safety/Switches';
import {  Switch } from '@mui/material';
import CustomSnackbar from '../MUIEdited/CustomSnackbar'; // Import your CustomSnackbar component

function Safety() {
  const [snackbarInfo, setSnackbarInfo] = useState({ isOpen: false, message: '', severity: 'success' });

  const handleSnackbarClose = () => setSnackbarInfo({ ...snackbarInfo, isOpen: false });

  return (
    <div className="settingsBody">
      <h1 className='title titleBody'>Safety & Privacy</h1>
      <div className='settingsData'>
      <p className="settingsParagraph">Manage how we use data to personalize your Reddit experience, and control how other redditors interact with you. To learn more, visit our{' '}
    <span className="link">
      <a target="_blank" href='https://support.reddithelp.com/hc/en-us/categories/360003246511' rel="noreferrer"> Privacy & Security FAQs </a>
    </span>{' '}.</p>
      <div className='titleData'>
        <h2 className="titleDataItem">SAFETY</h2>
      <div class="horizontalLine horizontalLine-2"></div>
      </div>        
      <BlockedUsers setSnackbarInfo={setSnackbarInfo} />
      <MuteCommunities setSnackbarInfo={setSnackbarInfo} />
      <CustomSnackbar {...snackbarInfo} onClose={handleSnackbarClose} />
      <div className='titleData'>
        <h2 className="titleDataItem">PRIVACY</h2>
      <div class="horizontalLine horizontalLine-2"></div>
      </div>        

    <div className="settingsItem">
      <div>
        <h2 className="titleBody-2">Show up in search results</h2>
    <p className='settingsParagraph'>Allow search engines like Google to link to your profile in their search results.</p>

      </div>
      <Switch defaultChecked sx={{ ml: 'auto' }}/>
    </div>
    <div className="settingsItem">
      <div>
        <h2 className="titleBody-2">Personalize ads on Reddit based on information and activity from our partners.</h2>
    <p className='settingsParagraph'>Allow us to use information from our partners to show you better ads on Reddit.</p>

      </div>
      <Switch defaultChecked sx={{ ml: 'auto' }}/>
    </div>

    <Switches/>
    
          <div className='titleData'>
        <h2 className="titleDataItem">ADVANCED SECURITY</h2>
        <div class="horizontalLine horizontalLine-2"></div>
      </div>

    <div className="settingsItem">
      <div>
        <h2 className="titleBody-2">Use two-factor authentication</h2>
    <p className='settingsParagraph'>Help protect your account (even if someone gets your password) by requiring a verification code and a password to log in.</p>
      </div>
      <Switch defaultChecked sx={{ ml: 'auto' }}/>
    </div>
    </div>
</div>
  );
}

export default Safety;
