import React, { useEffect } from "react";
import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { MdAlternateEmail } from "react-icons/md";
import { TbPasswordFingerprint } from "react-icons/tb";

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

  useEffect(() => {
    console.log(resetCode, newPassword, confirmNewPassword);
    setValidResetCode(resetCode.match(/^[a-zA-Z0-9]{6}$/));
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
            startIcon={<TbPasswordFingerprint />}
            disabled={!validResetCode || !validNewPassword || !validConfirmNewPassword}
            type="submit"
          >
            Reset
          </Button>
        </form>
      </div>
    </div>
  );
}
export default ResetCredentials;
