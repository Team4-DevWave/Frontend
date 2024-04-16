import React, { useState } from 'react';
import CustomSelect from '../MUIEdited/CustomSelect2';
import CustomSnackbar from '../MUIEdited/CustomSnackbar';
import ButtonEdited from '../MUIEdited/Button';

function SettingsItem({ title, description, defaultValue, values, isOpen, onClose, onSelection }) {
  return (
    <div className="settingsItem">
      <div>
        <h2 className="titleBody-2">{title}</h2>
        <p className="settingsParagraph">{description}</p>
      </div>
      <CustomSelect defaultValue={defaultValue} values={values} mr='none' ml='auto' onSelection={onSelection} />
      <CustomSnackbar
        isOpen={isOpen}
        message="Changes Saved Successfully!"
        severity="success"
        onClose={onClose}
      />
    </div>
  );
}

function Chat() {
  const [isSnackbarOpenChat, setIsSnackbarOpenChat] = useState(false);
  const [isSnackbarOpenMessage, setIsSnackbarOpenMessage] = useState(false);

  const handleSnackbarOpen = (setter) => {
    setter(true);
  };

  const handleSnackbarClose = (setter) => {
    setter(false);
  };

  const handleCloseSnackbarChat = () => {
    handleSnackbarClose(setIsSnackbarOpenChat);
  };

  const handleCloseSnackbarMessage = () => {
    handleSnackbarClose(setIsSnackbarOpenMessage);
  };

  const handleChangeChat = () => {
    handleSnackbarOpen(setIsSnackbarOpenChat);
  };

  const handleChangeMessage = () => {
    handleSnackbarOpen(setIsSnackbarOpenMessage);
  };

  return (
    <div className="settingsBody">
      <h1 className='titleBody'>Chat & Messaging</h1>
      <div className='settingsData'>
        <SettingsItem
          title="Who can send you private messages"
          description="Heads up—Reddit admins and moderators of communities you’ve joined can message you even if they’re not approved."
          defaultValue="Everyone"
          values={['Everyone', 'Accounts older Than 30 days', 'Nobody']}
          isOpen={isSnackbarOpenChat}
          onClose={handleCloseSnackbarChat}
          onSelection={handleChangeChat}
        />
          <SettingsItem
            title="Who can send you chat requests"
            description="This information may be used to improve your recommendations and ads."
            defaultValue="Everyone"
            values={['Everyone', 'Nobody']}
            isOpen={isSnackbarOpenMessage}
            onClose={handleCloseSnackbarMessage}
            onSelection={handleChangeMessage}
          />

        <div className="settingsItem">
          <div>
            <h2 className="titleBody-2">Mark all as read</h2>
            <p className="settingsParagraph">Mark all conversations and invites as read.</p>
          </div>
          <ButtonEdited color="var(--color-blue)" value="Make as Read"/>
        </div>
      </div>
    </div>
  );
}

export default Chat;
