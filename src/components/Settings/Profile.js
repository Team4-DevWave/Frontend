import '../../pages/Notification/notification.css'; // Import the CSS file

import React from 'react';
  import ProfileInformation from './Profile/ProfileInformation';
  import Images from './Profile/Images';
  import ProfileCategory from './Profile/ProfileCategory.js';
  import AdvancedSettings from './Profile/AdvancedSettings';
  import SocialLinks from './Profile/SocialLinks.js';

  function Profile() {
    return (
      <div className="settingsBody">
        <h1 className='title titleBody'>Customize profile</h1>
        <div className='settingsData'>
         <div className='titleData'>
          <h2 className="titleDataItem">PROFILE INFORMATION</h2>
        <div class="horizontalLine horizontalLine-2"></div>
        </div>        
          <ProfileInformation />
          <SocialLinks />
          <Images />
          <ProfileCategory />
          <AdvancedSettings />
        </div>
      </div>
    );
  }

  export default Profile;
