import React, { useState } from 'react';
import { Switch, Button } from '@mui/material';
import CustomSnackbar from '../../MUIEdited/CustomSnackbar'; // Import your CustomSnackbar component
import { clearHistoryAPI } from '.././APIs/ProfileAPI.js'; // Import your API function

function AdvancedSettings() {
  const [snackbarInfo, setSnackbarInfo] = useState({ isOpen: false, message: '', severity: 'success' });

  const handleSnackbarClose = () => setSnackbarInfo({ ...snackbarInfo, isOpen: false });

  const handleClearHistory = () => {
    clearHistoryAPI()
      .then(response => {
        if (response.success) {
          setSnackbarInfo({ isOpen: true, message: 'History cleared successfully!', severity: 'success' });
        } else {
          setSnackbarInfo({ isOpen: true, message: response.message || 'Failed to clear history. Please try again later.', severity: 'error' });
        }
      })
      .catch(error => {
        console.error('Error clearing history:', error);
        setSnackbarInfo({ isOpen: true, message: 'An error occurred while clearing history. Please try again later.', severity: 'error' });
      });
  };

  return (
    <>
      <div className='titleData'>
        <h2 className="titleDataItem">ADVANCED</h2>
        <div className="horizontalLine horizontalLine-2"></div>
      </div>

      <div className="settingsItem">
        <div>
          <h2 className="titleBody-2">Allow people to follow you</h2>
          <p>
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
          }}
          onClick={handleClearHistory}
        >
          Clear history
        </Button>
      </div>

      <CustomSnackbar {...snackbarInfo} onClose={handleSnackbarClose} />
    </>
  );
}

export default AdvancedSettings;
