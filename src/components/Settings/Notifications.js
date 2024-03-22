import React, { useState } from 'react';
import { Switch } from '@mui/material';
import CustomSnackbar from '../MUIEdited/CustomSnackbar';

function SettingItem({ title, isOpen, onClose,onSelection }) {
  return (
    <div className="settingsItem">
      <div>
        <h2 className="titleBody-2">{title}</h2>
      </div>
      <Switch defaultChecked sx={{ ml: 'auto' }} onChange={onSelection} />
      <CustomSnackbar
        isOpen={isOpen}
        message="Changes Saved Successfully!"
        severity="success"
        onClose={onClose}
      />
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

function Notification() {
  const [isSnackbarOpenMessage, setIsSnackbarOpenMessage] = useState(false);

  const handleCloseSnackbarMessage = () => {
    setIsSnackbarOpenMessage(false);
  };

  const handleChangeMessage = () => {
    setIsSnackbarOpenMessage(true);
  };


  return (
    <div className="settingsBody">
      <h1 className='title titleBody'>Notification settings</h1>
      <div className='settingsData'>
        <SectionHeader title="MESSAGES" />
        <SettingItem title="Private messages"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}
        />
        <SettingItem title="Chat messages"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
        <SettingItem title="Chat requests"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />

        <SectionHeader title="ACTIVITY" />
        <SettingItem title="Mentions of u/username"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
        <SettingItem title="Comments on your posts"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
        <SettingItem title="Upvotes on your posts"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
        <SettingItem title="Upvotes on your comments"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
        <SettingItem title="Replies to your comments"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
        <SettingItem title="Activity on your comments"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
        <SettingItem title="Activity on chat posts you're in"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
        <SettingItem title="New followers"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
        <SettingItem title="Awards you receive"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
        <SettingItem title="Posts you follow"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
        <SettingItem title="Upvotes on your comments"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
        <SettingItem title="Comments you follow"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />

        <SectionHeader title="RECOMMENDATIONS" />
        <SettingItem title="Trending posts"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
        <SettingItem title="Community recommendations"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
        <SettingItem title="ReReddit"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
        <SettingItem title="Featured content"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />

        <SectionHeader title="UPDATES" />
        <SettingItem title="Reddit announcements"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
        <SettingItem title="Cake day"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />

        <SectionHeader title="MODERATION" />
        <SettingItem title="Mod notifications"
        isOpen={isSnackbarOpenMessage}
        onClose={handleCloseSnackbarMessage}
        onSelection={handleChangeMessage}

        />
      </div>
    </div>
  );
}
export default Notification;
