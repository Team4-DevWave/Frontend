import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function LanguageSelectionDialog({ open, onClose, onSave }) {
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const handleLanguageChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedLanguages((prevSelectedLanguages) => [...prevSelectedLanguages, value]);
    } else {
      setSelectedLanguages((prevSelectedLanguages) => prevSelectedLanguages.filter(lang => lang !== value));
    }
  };

  const handleSave = () => {
    onSave()
    onClose();
  };

  const languages = [
    "English", "Spanish", "French", "German", "Chinese",
    "Japanese", "Arabic", "Russian", "Italian", "Portuguese",
    "Hindi", "Bengali", "Urdu", "Turkish", "Korean",
    "Dutch", "Swedish", "Norwegian", "Danish", "Finnish"
  ];

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Choose Languages</DialogTitle>
      <DialogContent>
        {languages.map(language => (
          <FormControlLabel
            key={language}
            control={<Checkbox />}
            label={language}
            value={language.toLowerCase()} // Converting language to lowercase for consistency
            onChange={handleLanguageChange}
            checked={selectedLanguages.includes(language.toLowerCase())}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default LanguageSelectionDialog;
