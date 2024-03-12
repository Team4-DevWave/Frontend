import React from 'react';
import {  Switch } from '@mui/material';
import ContentSort from './Feed/ContentSort';

function Feed() {

  return (
    <div className="settingsBody">
      <h1 className='title titleBody'>Feed settings</h1>
      <div className='settingsData'>

          <div className='titleData'>
            <h2 className="titleDataItem">CONTENT PREFERENCES</h2>
          <div class="horizontalLine horizontalLine-2"></div>
          </div>        

          <div className="settingsItem">
            <div>
              <h2 className="titleBody-2">Enable home feed recommendations</h2>
          <p className='settingsParagraph'>Allow us to introduce recommended posts in your home feed.</p>

            </div>
            <Switch defaultChecked sx={{ ml: 'auto' }}/>
          </div>

          <div className="settingsItem">
            <div>
              <h2 className="titleBody-2">Autoplay media</h2>
          <p className='settingsParagraph'>Play videos and gifs automatically when in the viewport.</p>

            </div>
            <Switch defaultChecked sx={{ ml: 'auto' }}/>
          </div>

          <div className="settingsItem">
            <div>
              <h2 className="titleBody-2">Reduce Animations</h2>
          <p className='settingsParagraph'>Reduce animations on posts, comments, and feeds.</p>

            </div>
            <Switch defaultChecked sx={{ ml: 'auto' }}/>
          </div>

          <div className="settingsItem">
            <div>
              <h2 className="titleBody-2">Community themes</h2>
          <p className='settingsParagraph'>Use custom themes for all communities. You can also turn this off on a per community basis.</p>

            </div>
            <Switch defaultChecked sx={{ ml: 'auto' }}/>
          </div>
    
          <ContentSort/>
      </div>
    </div>
  );
}

export default Feed;
