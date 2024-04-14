import React, { useEffect } from "react";
import { useState } from "react";
import CustomSnackbar from "./MUIEdited/CustomSnackbar";
import {
  Button,
  Dialog,
  Link,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,

} from "@mui/material";

function ForgetUsername() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    openSnack(true);
    setRecoveryMail("");
  };

  const handleCancelModal = () => {
    setOpen(false);
    setRecoveryMail("");

  };

  const [recoveryMail, setRecoveryMail] = useState("");

  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (recoveryMail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [recoveryMail]);

  const [snack, openSnack] = useState(false);
  const [message, setMessage] = useState("An email has been sent to you for password recovery.");
  const [severity, setSeverity] = useState("success");



  return (
    <>
      <Link onClick={handleClickOpen} underline="none" >
        Forgot Username?
      </Link>
        <Dialog
            open={open}
            onClose={handleCancelModal}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Reset Username</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your email address to reset your username
                </DialogContentText>
                <TextField
                     InputProps={{
                      style: { borderRadius: 25 },
                      
                    }}
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                    onChange={(e) => setRecoveryMail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelModal} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleCloseModal} disabled={!valid} color="primary">
                    Submit
                </Button>
            </DialogActions>
            </Dialog>
            <CustomSnackbar isOpen={snack} onClose={()=>openSnack(false)} message={message} severity={severity} />
    </>
    
  );
}

export default ForgetUsername;
