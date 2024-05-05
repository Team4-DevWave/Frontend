import React, { useEffect } from "react";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { MdAlternateEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";
import CustomSnackbar from "../components/MUIEdited/CustomSnackbar";
import PropTypes from "prop-types";

function ResetCredentials() {
  const [resetCode, setResetCode] = useState("");
  const [touchedResetCode, setTouchedResetCode] = useState(false);
  const [validResetCode, setValidResetCode] = useState(false);
  const [validNewPassword, setValidNewPassword] = useState(false);
  const [validConfirmNewPassword, setValidConfirmNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [touchedNewPassword, setTouchedNewPassword] = useState(false);
  const [touchedConfirmNewPassword, setTouchedConfirmNewPassword] =
    useState(false);
    const [snack, openSnack] = useState(false);

  useEffect(() => {
    console.log(resetCode, newPassword, confirmNewPassword,);
    console.log(validResetCode, "validResetCode");
    
    setValidResetCode(resetCode.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/));
    setValidNewPassword(
      newPassword.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    );
    setValidConfirmNewPassword(newPassword === confirmNewPassword);
  }, [resetCode, newPassword, confirmNewPassword]);
  return (
    <div className="wrapper">
      <div className="background-div">
        <form className="login-form">
          <h2>Reset Credentials</h2>
          <TextField
            InputProps={{
              endAdornment: <MdAlternateEmail />,
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Reset Code"
            type="text"
            error={!resetCode && touchedResetCode}
            helperText={
              !resetCode && touchedResetCode ? "Code is required" : ""
            }
            onChange={(e) => {
              setResetCode(e.target.value);
            }}
            onBlur={() => setTouchedResetCode(true)}
          />
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
            disabled={!validResetCode || !validNewPassword || !validConfirmNewPassword}
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
  /** The reset code sent to the user's email */
  resetCode: PropTypes.string,
  /** The new password */
  newPassword: PropTypes.string,
  /** The new password confirmation */
  confirmNewPassword: PropTypes.string,
};
