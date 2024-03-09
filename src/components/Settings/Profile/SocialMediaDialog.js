// SocialMediaDialog.js
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const SocialMediaDialog = ({ open, onClose, onSave, socialMedia }) => {
  const [socialLink, setSocialLink] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSocialLink(value);
  };

  const handleSave = () => {
    onSave(socialMedia, socialLink);
    setSocialLink(''); // Clear input field after saving
  };

  if (!socialMedia) {
    return null; // Return null if no social media platform is selected
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add {socialMedia.charAt(0).toUpperCase() + socialMedia.slice(1)} Link</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label={`Enter ${socialMedia} link`}
          value={socialLink}
          onChange={handleChange}
          placeholder={`Enter ${socialMedia} link`}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SocialMediaDialog;
