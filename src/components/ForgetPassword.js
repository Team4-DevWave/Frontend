import React, { useEffect } from "react";
import { useState } from "react";
import CustomSnackbar from "./MUIEdited/CustomSnackbar";
import axios from "axios";
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
import PropTypes from "prop-types";

function ForgetPassword() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  let yourBearerToken = "";

  const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
  };

  const handleCloseModal = () => {
    setOpen(false);
    openSnack(true);
    setRecoveryMail("");
    axios.post("http://localhost:8000/api/v1/users/forgotPassword",{
      email: recoveryMail,
      username: recoverUsername
    },config);
  };

  const handleCancelModal = () => {
    setOpen(false);
    setRecoveryMail("");

  };

  const [recoveryMail, setRecoveryMail] = useState("");

  const [recoverUsername, setRecoverUsername] = useState("");

  const [validMail, setValidMail] = useState(false);

  const [validUsername, setValidUsername] = useState(false);

  

  useEffect(() => {
    if (recoveryMail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setValidMail(true);
    } else {
      setValidMail(false);
    }
  }, [recoveryMail]);

  useEffect(() => {
    if (recoverUsername.match(/^[a-zA-Z0-9_]{3,16}$/)) {
      setValidUsername(true);
    } else {
      setValidUsername(false);
    }
  }, [recoverUsername]);

  const [snack, openSnack] = useState(false);
  const [message, setMessage] = useState("An email has been sent to you for password recovery.");
  const [severity, setSeverity] = useState("success");



  return (
    <>
      <Link onClick={handleClickOpen} underline="none" >
        Forgot Password?
      </Link>
        <Dialog
            open={open}
            onClose={handleCancelModal}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your email address to reset your password
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
                <TextField
                    InputProps={{
                      style: { borderRadius: 25 },
                    }}
                    margin="dense"
                    id="name"
                    label="Username"
                    type="text"
                    fullWidth
                    onChange={(e) => setRecoverUsername(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelModal} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleCloseModal} disabled={!validMail || !validUsername} color="primary">
                    Submit
                </Button>
            </DialogActions>
            </Dialog>
            <CustomSnackbar isOpen={snack} onClose={()=>openSnack(false)} message={message} severity={severity} />
    </>
    
  );
}

export default ForgetPassword;

ForgetPassword.propTypes = {
  /** The user's email */
  email: PropTypes.string,
  /** The user's username */
  username: PropTypes.string,
  /** Cancels the reset form */
  cancelBtn: PropTypes.func,
  /** Submits the reset form, sends request to API to send a reset email */
  submitBtn: PropTypes.func,
};