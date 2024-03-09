import React, { useState } from 'react';
import {Box, TextField, Switch, Button } from '@mui/material';
import SocialMediaDialog from '../MUIEdited/SocialMediaDialog';
import PlusIcon from '../MUIEdited/PlusIcon';



function Profile() {
  const [displayName, setDisplayName] = useState('');
  const [displayNameMulti, setDisplayNameMulti] = useState('');
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [open, setOpen] = useState(false);
  const [addedSocialLinks, setAddedSocialLinks] = useState({});
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);

  const handleOpen = (socialMedia) => {
    setOpen(true);
    setSelectedSocialMedia(socialMedia);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSocialMedia(null);
  };

  const handleSave = (socialMedia, link) => {
    setAddedSocialLinks(prevState => ({
      ...prevState,
      [socialMedia]: link
    }));
  };
  const handleChangeMulti = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 200) {
      setDisplayNameMulti(inputValue);
    }
  }

  const handleChange = (event) => {
    const inputValue = event.target.value;
    // Limit input to 50 characters
    if (inputValue.length <= 50) {
      setDisplayName(inputValue);
    }
  };

  return (
  <div className="settingsBody">
        <h1 className='title titleBody'>Customize profile</h1>
        <div className='settingsData'>
          <div className='titleData'>
          <h2 className="titleDataItem">PROFILE INFORMATION</h2>
        <div class="horizontalLine horizontalLine-2"></div>
        </div>
        <div className="settingsItem">
          <div>
            <h2 className="titleBody-2">Display name (optional)</h2>
            <p className="settingsParagraph">Set a display name. This does not change your username.</p>
            <Box sx={{ width: 700, maxWidth: '100%' }}>
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
            <Box sx={{ width: 700, maxWidth: '100%' }}>
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
    <div className="settingsItem">
      <div>
        <h2 className="titleBody-2">Social links (5 max)</h2>
        <p className="settingsParagraph">People who visit your profile will see your social links.</p>
<Button 
sx={{
color: 'var(--color-black)',
background: 'var(--color-light-gray)',
fontWeight: "bold",
fontSize: "var(--font-very-small)",
textTransform: 'none',
padding: '10px 15px',
borderRadius: '10rem',
border: '0',
ml: 'auto',
}}
  onClick={handleOpen}> <PlusIcon/> Add Social Links</Button>
          <Button variant="contained" onClick={() => handleOpen('reddit')}>Add Reddit Link</Button>
        <Button variant="contained" onClick={() => handleOpen('instagram')}>Add Instagram Link</Button>
        <SocialMediaDialog open={open} onClose={handleClose} onSave={handleSave} socialMedia={selectedSocialMedia} />
        <ul>
          {Object.keys(addedSocialLinks).map((socialMedia, index) => (
            <li key={index}>
              {socialMedia.charAt(0).toUpperCase() + socialMedia.slice(1)}: {addedSocialLinks[socialMedia]}
            </li>
          ))}
        </ul>
      </div>
    </div>
        <div className='titleData'>
          <h2 className="titleDataItem">IMAGES</h2>
        <div class="horizontalLine horizontalLine-2"></div>
        </div>
        <div className="settingsItem">
          <div>
            <h2 className="titleBody-2">Avatar and banner image</h2>
            <p className="settingsParagraph">Images must be .png or .jpg format</p>
            <Box sx={{ width: 700, maxWidth: '100%' }}>
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
        <div className='titleData'>
          <h2 className="titleDataItem">PROFILE CATEGORY</h2>
        <div class="horizontalLine horizontalLine-2"></div>
        </div>
          <div className="settingsItem">
            <div>
        <h2 className="titleBody-2">NSFW</h2>
        <p className="settingsParagraph">This content is NSFW (may contain nudity, pornography, profanity or inappropriate content for those under 18)</p>
        </div>
        <Switch {...label} defaultChecked />

        </div>
          <div className='titleData'>
            <h2 className="titleDataItem">ADVANCED</h2>
          <div class="horizontalLine horizontalLine-2"></div>
          </div>

</div>
</div>
    );
}

export default Profile;