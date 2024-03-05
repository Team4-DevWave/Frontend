import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import ButtonEdited from '../MUIEdited/Button';
import SelectEdited from '../MUIEdited/CustomSelect';
import CustomSnackbar from '../MUIEdited/CustomSnackbar';
import LanguageSelectionDialog from '../MUIEdited/LanguageSelectionDialog';

function Account() {
  const [email, setEmail] = useState("example@gmail.com");
  const [newEmail, setNewEmail] = useState(""); // Add this line
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isSnackbarOpenGender, setIsSnackbarOpenGender] = useState(false);
  const [isSnackbarOpenLanguage, setIsSnackbarOpenLanguage] = useState(false);
  const [isSnackbarOpenLanguages, setIsSnackbarOpenLanguages] = useState(false);
  const [isSnackbarOpenLocation, setIsSnackbarOpenLocation] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeGender = () => {
    setIsSnackbarOpenGender(true);
  };
  const handleChangeLanguage = () => {
    setIsSnackbarOpenLanguage(true);
  };
  const handleChangeLanguages = () => {
    setIsSnackbarOpenLanguages(true);
  };
  const handleChangeLocation = () => {
    setIsSnackbarOpenLocation(true);
  };

  const handleOpenEmailDialog = () => {
    setOpenEmailDialog(true);
  };

  const handleCloseEmailDialog = () => {
    setOpenEmailDialog(false);
  };

  const handleCloseSnackbarGender = () => {
    setIsSnackbarOpenGender(false);
  };
  const handleCloseSnackbarLocation = () => {
    setIsSnackbarOpenLocation(false);
  };
  const handleCloseSnackbarLanguage = () => {
    setIsSnackbarOpenLanguage(false);
  };
  const handleCloseSnackbarLanguages = () => {
    setIsSnackbarOpenLanguages(false);
  };

  const handleEmailChange = () => { // Rename the function to handleEmailChange
    if (validateEmail(newEmail)) {
      setEmail(newEmail);
      setSnackbarMessage("Email changed successfully!");
      setSnackbarSeverity("success");
    } else {
      setSnackbarMessage("Invalid email address!");
      setSnackbarSeverity("error");
    }
    setIsSnackbarOpen(true);
    setOpenEmailDialog(false); // Close the dialog
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(false);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };


  return (
  <div className="settingsBody">
        <h1 className='title titleBody'>Account settings</h1>
        <div className='settingsData'>
          <div className='titleData'>
          <h2 className="titleDataItem">ACCOUNT PREFERENCES</h2>
        <div class="horizontalLine horizontalLine-2"></div>
        </div>
        <div className="settingsItem">
          <div>
      <h2 className="titleBody-2">Email address</h2>
      <p className="settingsParagraph">{email}</p>
      <CustomSnackbar
        isOpen={isSnackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        onClose={handleCloseSnackbar}
      />
      </div>
          <ButtonEdited color="var(--color-blue)" value="Change" onClick={handleOpenEmailDialog} />
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
          <SelectEdited defaultValue="Man" values={['Man', 'Woman']} mr='none' ml='auto' onSelection={handleChangeGender}  />
          <CustomSnackbar
            isOpen={isSnackbarOpenGender}
            message="Gender changed successfully!"
            severity="success"
            onClose={handleCloseSnackbarGender}
          />
        </div>
        <div className="settingsItem">
          <div>
            <h2 className="titleBody-2">Display language <span className="beta">(beta)</span></h2>
            <p className="settingsParagraph">Select the language you'd like to experience the Reddit interface in. Note that this won't change the language of user-generated content and that this feature is still in development so translations and UI are still under review.</p>
          </div>

        </div>
        <div className="settingsItem">
          <SelectEdited defaultValue="English (US)" values={['English (US)','Arabic','German','French','Italian','Indian']}  mr='auto' ml='none' onSelection={handleChangeLanguage} />
          <CustomSnackbar
            isOpen={isSnackbarOpenLanguage}
            message="Language changed successfully!"
            severity="success"
            onClose={handleCloseSnackbarLanguage}
          />

        </div>
    
        <div className="settingsItem">
          <div>
            <h2 className="titleBody-2">Content languages</h2>
            <p className="settingsParagraph">Add languages you’d like to see posts, community recommendations, and other content in</p>
          </div>
          <ButtonEdited color="var(--color-blue)" value="Change" onClick={handleOpen}  />
          <LanguageSelectionDialog open={open} onClose={handleClose} onSave={handleChangeLanguages} />
          <CustomSnackbar
            isOpen={isSnackbarOpenLanguages}
            message="Languages saved successfully!"
            severity="success"
            onClose={handleCloseSnackbarLanguages}
          />

        </div>

      <div>
            <h2 className="titleBody-2">Location customization</h2>
            <p className="settingsParagraph">Specify a location to customize your recommendations and feed. Reddit does not track your precise geolocation data. <span className="link"><a target="_blank" href='https://support.reddithelp.com/hc/en-us/articles/360062429491-Managing-your-Location-Customization-setting' rel="noreferrer">Learn more</a></span></p>
      </div>
      <div>      
          <SelectEdited defaultValue="Use approximate location (based on IP)" values={['Use approximate location (based on IP)','No location specified','Afghanistan','Afghanistan','Albania','Algeria', 'American Samoa', 'Palestine', 'Egypt', 'Angola', 'Albania']}  mr='auto' ml='none' onSelection={handleChangeLocation} />
          <CustomSnackbar
            isOpen={isSnackbarOpenLocation}
            message="Location changed successfully!"
            severity="success"
            onClose={handleCloseSnackbarLocation}
          />


      </div>
          <div className='titleData'>
          <h2 className="titleDataItem">DELETE ACCOUNT</h2>
        <div class="horizontalLine horizontalLine-2"></div>
        </div>
      <div className="settingsItem">
          <Button
          color="error"
            sx={{
              color: "var(--color-light-red)",
              fontWeight: "bold",
              fontSize: "var(--font-very-small)",
              borderRadius: '10rem',
              ml: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',}}><img  src="./images/delete.png" width="20px" alt="Delete"/> <span> DELETE ACCOUNT</span></Button>
      </div>
    </div>

</div>
    );

  }

export default Account;