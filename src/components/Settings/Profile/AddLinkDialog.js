import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import SocialMediaDialog from './SocialMediaDialog';

const socialMediaButtons = [
  { name: 'Reddit', key: 'reddit' },
  { name: 'GitHub', key: 'gitHub' },
  { name: 'Linkedin', key: 'linkedin' },
  { name: 'Twitter', key: 'twitter' },
  { name: 'Facebook', key: 'facebook' },
  { name: 'Instagram', key: 'instagram' },
  { name: 'Youtube', key: 'youtube' },
];

const AddLinkDialog = ({ open, onClose }) => {
  const [addedSocialLinks, setAddedSocialLinks] = useState({});
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(null);

  const handleOpen = (socialMedia) => {
    setSelectedSocialMedia(socialMedia);
  };

  const handleClose = () => {
    setSelectedSocialMedia(null);
  };

  const handleSave = (socialMedia, link) => {
    setAddedSocialLinks((prevState) => ({
      ...prevState,
      [socialMedia]: link,
    }));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Social Link!</DialogTitle>
      <DialogContent>
        {socialMediaButtons.map((button) => (
          <Button
            key={button.key}
            sx={{
              color: 'var(--color-black)',
              background: 'var(--color-light-gray)',
              fontWeight: 'bold',
              fontSize: 'var(--font-very-small)',
              textTransform: 'none',
              padding: '10px 15px',
              borderRadius: '10rem',
              border: '0',
              m: '4px',
            }}
            onClick={() => handleOpen(button.key)}
          >
            {`Add ${button.name} Link`}
          </Button>
        ))}
        <SocialMediaDialog
          open={Boolean(selectedSocialMedia)}
          onClose={handleClose}
          onSave={handleSave}
          socialMedia={selectedSocialMedia}
        />
        <ul>
          {Object.keys(addedSocialLinks).map((socialMedia, index) => (
            <li key={index}>
              {socialMedia.charAt(0).toUpperCase() + socialMedia.slice(1)}: {addedSocialLinks[socialMedia]}
            </li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddLinkDialog;
