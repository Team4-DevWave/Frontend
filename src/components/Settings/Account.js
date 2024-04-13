import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import ButtonEdited from '../MUIEdited/Button';
import ButtonDelete from '../MUIEdited/ButtonDelete';
import CustomSelect from '../MUIEdited/CustomSelect';
import CustomSnackbar from '../MUIEdited/CustomSnackbar';
import LanguageSelectionDialog from '../MUIEdited/LanguageSelectionDialog';

function Account() {
  const [email, setEmail] = useState("example@gmail.com");
  const [newEmail, setNewEmail] = useState("");
  const [snackbarInfo, setSnackbarInfo] = useState({ isOpen: false, message: "", severity: "success" });
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSnackbarClose = () => setSnackbarInfo({ ...snackbarInfo, isOpen: false });

  const handleEmailChange = () => {
    const isValidEmail = validateEmail(newEmail);
    if (isValidEmail) {
      setEmail(newEmail);
      setSnackbarInfo({ isOpen: true, message: "Email changed successfully!", severity: "success" });
      setOpenEmailDialog(false); // Close the dialog
    } else {
      setSnackbarInfo({ isOpen: true, message: "Invalid email address!", severity: "error" });
    }
  };

  const handleOpenEmailDialog = () => setOpenEmailDialog(true);
  const handleCloseEmailDialog = () => setOpenEmailDialog(false);

  const handleChange = (prop, value) => {
    setSnackbarInfo({ isOpen: true, message: `${prop.charAt(0).toUpperCase() + prop.slice(1)} changed successfully!`, severity: "success" });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="settingsBody">
      <h1 className='titleBody'>Account settings</h1>
      <div className='settingsData'>
        <div className='titleData'>
          <h2 className="titleDataItem">ACCOUNT PREFERENCES</h2>
          <div className="horizontalLine horizontalLine-2"></div>
        </div>
        <div className="settingsItem">
          <div>
            <h2 className="titleBody-2">Email address</h2>
            <p className="settingsParagraph">{email}</p>
            <CustomSnackbar {...snackbarInfo} onClose={handleSnackbarClose} />
          </div>
          <div id='changeEmail' data-testid="changeEmail"></div>

          <ButtonEdited
            color="var(--color-blue)"
            value="Change"
            onClick={handleOpenEmailDialog} 
          />
          {/* Dialog for changing email */}
          <Dialog open={openEmailDialog} onClose={handleCloseEmailDialog}>
            <DialogTitle>Change Email Address</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="newEmail"
                label="New Email Address"
                type="email"
                fullWidth
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEmailDialog}>Cancel</Button>
              <Button onClick={handleEmailChange}>Change</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="settingsItem">
          <div>
            <h2 className="titleBody-2">Gender</h2>
            <p className="settingsParagraph">This information may be used to improve your recommendations and ads.</p>
          </div>

          <CustomSelect defaultValue="Man" values={['Man', 'Woman']} mr='none' ml='auto' onSelection={(value) => handleChange('gender', value)} />
        </div>
        <div className="settingsItem">
          <div>
            <h2 className="titleBody-2">Display language <span className="beta">(beta)</span></h2>
            <p className="settingsParagraph">Select the language you'd like to experience the Reddit interface in. Note that this won't change the language of user-generated content and that this feature is still in development so translations and UI are still under review.</p>
          </div>
          <CustomSelect defaultValue="English (US)" values={['English (US)', 'Arabic', 'German', 'French', 'Italian', 'Indian']} mr='none' ml='auto' onSelection={(value) => handleChange('language', value)} />
        </div>
        <div className="settingsItem">
          <div>
            <h2 className="titleBody-2">Content languages</h2>
            <p className="settingsParagraph">Add languages you’d like to see posts, community recommendations, and other content in</p>
          </div>
          <ButtonEdited color="var(--color-blue)" value="Change" onClick={handleOpen} />
          <LanguageSelectionDialog open={open} onClose={handleClose} onSave={() => handleChange('languages')} />
        </div>
        <div>
          <h2 className="titleBody-2">Location customization</h2>
          <p className="settingsParagraph">Specify a location to customize your recommendations and feed. Reddit does not track your precise geolocation data. <span className="link"><a target="_blank" href='https://support.reddithelp.com/hc/en-us/articles/360062429491-Managing-your-Location-Customization-setting' rel="noreferrer">Learn more</a></span></p>
        </div>
        <div>
          <CustomSelect defaultValue="Use approximate location (based on IP)" values={['Use approximate location (based on IP)', 'No location specified', 'Afghanistan', 'Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Palestine', 'Egypt', 'Angola', 'Albania']} mr='auto' ml='none' onSelection={(value) => handleChange('location', value)} />
        </div>
        <div className='titleData'>
          <h2 className="titleDataItem">DELETE ACCOUNT</h2>
          <div className="horizontalLine horizontalLine-2"></div>
        </div>
        <ButtonDelete/>
      </div>
    </div>
  );
}
export default Account;
