import React from 'react';
import { Snackbar } from '@mui/material';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';

function CustomSnackbar({ isOpen, message, severity, onClose }) {
  return (
    <Snackbar
      open={isOpen}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={Slide}
      autoHideDuration={2000}
    >
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
