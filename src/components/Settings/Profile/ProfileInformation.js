import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { updateProfileInfoAPI } from '.././APIs/ProfileAPI.js'; // Import your API function
import CustomSnackbar from '../../MUIEdited/CustomSnackbar'; // Import your CustomSnackbar component

function ProfileInformation() {
  const [displayName, setDisplayName] = useState('');
  const [displayNameMulti, setDisplayNameMulti] = useState('');
  const [snackbarInfo, setSnackbarInfo] = useState({ isOpen: false, message: '', severity: 'success' });

  const handleChangeMulti = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 200) {
      setDisplayNameMulti(inputValue);
      // Call API to update about section
      updateProfileInfoAPI({ about: inputValue }).then(response => {
        if (!response.success) {
          setSnackbarInfo({ isOpen: true, message: 'Failed to update about section. Please try again later.', severity: 'error' });
        }
      }).catch(error => {
        console.error('Error updating about section:', error);
        setSnackbarInfo({ isOpen: true, message: 'An error occurred while updating about section. Please try again later.', severity: 'error' });
      });
    }
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 50) {
      setDisplayName(inputValue);
      // Call API to update display name
      updateProfileInfoAPI({ displayName: inputValue }).then(response => {
        if (!response.success) {
          setSnackbarInfo({ isOpen: true, message: 'Failed to update display name. Please try again later.', severity: 'error' });
        }
      }).catch(error => {
        console.error('Error updating display name:', error);
        setSnackbarInfo({ isOpen: true, message: 'An error occurred while updating display name. Please try again later.', severity: 'error' });
      });
    }
  };

  const handleSnackbarClose = () => setSnackbarInfo({ ...snackbarInfo, isOpen: false });

  return (
    <>
      <div className="settingsItem">
        <div>
          <h2 className="titleBody-2">Display name (optional)</h2>
          <p className="settingsParagraph">Set a display name. This does not change your username.</p>
          <Box sx={{ width: 700, maxWidth: '100%',
            '@media screen and (max-width: 1000px)': {
              width: '100%'
            }, }}>
            <TextField
              fullWidth
              id="fullWidth"
              label="Display name (optional)"
              value={displayName}
              onChange={handleChange}
              inputProps={{ maxLength: 30 }}
            />
            <p className="settingsParagraph">Characters remaining: {30 - displayName.length}</p>
          </Box>
        </div>
      </div>
      <div className="settingsItem">
        <div>
          <h2 className="titleBody-2">About (optional)</h2>
          <p className="settingsParagraph">A brief description of yourself shown on your profile.</p>
          <Box sx={{ width: 700, maxWidth: '100%',
            '@media screen and (max-width: 1000px)': {
              width: '100%'
            },
          }}>
            <TextField
              fullWidth
              multiline
              id="fullWidth"
              label="About (optional)"
              value={displayNameMulti}
              onChange={handleChangeMulti}
              inputProps={{ maxLength: 200 }}
            />
            <p className="settingsParagraph">Characters remaining: {200 - displayNameMulti.length}</p>
          </Box>
        </div>
      </div>
      <CustomSnackbar {...snackbarInfo} onClose={handleSnackbarClose} />
    </>
  );
}

export default ProfileInformation;
