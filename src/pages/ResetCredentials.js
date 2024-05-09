import React, { useEffect } from "react";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { TbPasswordFingerprint } from "react-icons/tb";
import CustomSnackbar from "../components/MUIEdited/CustomSnackbar";
import PropTypes from "prop-types";
import axios from "axios";

function ResetCredentials() {
  const [validNewPassword, setValidNewPassword] = useState(false);
  const [validConfirmNewPassword, setValidConfirmNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [touchedNewPassword, setTouchedNewPassword] = useState(false);
  const [touchedConfirmNewPassword, setTouchedConfirmNewPassword] =
    useState(false);
  const [snack, openSnack] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validNewPassword && validConfirmNewPassword) {
      const token = localStorage.getItem('token');

      axios.post(`https://www.threadit.tech/api/v1/users/resetPassword/?token=${token}`, {
        password: newPassword,
        passwordConfirm: confirmNewPassword
      })
      .then((response) => {
        console.log(response);
        openSnack(true);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
    }
  };
  useEffect(() => {
    console.log(newPassword, confirmNewPassword);
    
    setValidNewPassword(
      newPassword.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    );
    setValidConfirmNewPassword(newPassword === confirmNewPassword);
  }, [newPassword, confirmNewPassword]);

  return (
    <div className="wrapper">
      <div className="background-div">
      <form className="login-form" onSubmit={handleSubmit}>
          <h2>Reset Credentials</h2>
          <TextField
            InputProps={{
              endAdornment: <TbPasswordFingerprint />,
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="New Password"
            type="password"
            error={!newPassword && touchedNewPassword}
            helperText={
              !newPassword && touchedNewPassword ? "Invalid password" : ""
            }
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            onBlur={() => setTouchedNewPassword(true)}
          />
          <TextField
            InputProps={{
              endAdornment: <TbPasswordFingerprint />,
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Confirm New Password"
            type="password"
            error={!confirmNewPassword && touchedConfirmNewPassword}
            helperText={
              !confirmNewPassword && touchedConfirmNewPassword
                ? "Passwords do not match"
                : ""
            }
            onChange={(e) => {
              setConfirmNewPassword(e.target.value);
            }}
            onBlur={() => setTouchedConfirmNewPassword(true)}
          />

          <Button
            variant="contained"
            sx={{
              width: "100%",
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#FF5700",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
            onClick={()=>{
                openSnack(true);
            }}
            startIcon={<TbPasswordFingerprint />}
            disabled={!validNewPassword || !validConfirmNewPassword}
            type="submit"
          >
            Reset
          </Button>
          <CustomSnackbar
            isOpen={snack} onClose={()=>openSnack(false)}
            message="Password reset successfully"
            severity="success"
            />
        </form>
      </div>
    </div>
  );
}
export default ResetCredentials;


ResetCredentials.propTypes = {
  /** The new password */
  newPassword: PropTypes.string,
  /** The new password confirmation */
  confirmNewPassword: PropTypes.string,
};