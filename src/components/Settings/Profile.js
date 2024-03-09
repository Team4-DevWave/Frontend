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
