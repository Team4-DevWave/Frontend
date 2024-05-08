import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";
import CustomSnackbar from "../../MUIEdited/CustomSnackbar"; // Import your CustomSnackbar component

function ProfileInformation() {
  const [displayName, setDisplayName] = useState(
    localStorage.getItem("username") || "yourusername"
  );
  const [displayNameMulti, setDisplayNameMulti] = useState(
    localStorage.getItem("about") ||
      "This is my about section, I am a new user!"
  );
  const [snackbarInfo, setSnackbarInfo] = useState({
    isOpen: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    // Retrieve username and about from local storage when component mounts
    const storedUsername = localStorage.getItem("username");
    const storedAbout = localStorage.getItem("about");
    if (storedUsername) setDisplayName(storedUsername);
    if (storedAbout) setDisplayNameMulti(storedAbout);
  }, []);

  const handleChangeMulti = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 200) {
      setDisplayNameMulti(inputValue);
      // Save about information to local storage
      localStorage.setItem("about", inputValue);
    }
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 50) {
      setDisplayName(inputValue);
      // Save username to local storage
      localStorage.setItem("username", inputValue);
    }
  };

  const handleSnackbarClose = () =>
    setSnackbarInfo({ ...snackbarInfo, isOpen: false });

  return (
    <>
      <div className="settingsItem">
        <div>
          <h2 className="titleBody-2">Display name (optional)</h2>
          <p className="settingsParagraph">
            Set a display name. This does not change your username.
          </p>
          <Box
            sx={{
              width: 700,
              maxWidth: "100%",
              "@media screen and (max-width: 1000px)": {
                width: "100%",
              },
            }}
          >
            <TextField
              fullWidth
              id="fullWidth"
              label={localStorage.getItem("username")}
              value={displayName}
              onChange={handleChange}
              inputProps={{ maxLength: 30 }}
            />
            <p className="settingsParagraph">
              Characters remaining: {30 - displayName.length}
            </p>
          </Box>
        </div>
      </div>
      <div className="settingsItem">
        <div>
          <h2 className="titleBody-2">About (optional)</h2>
          <p className="settingsParagraph">
            A brief description of yourself shown on your profile.
          </p>
          <Box
            sx={{
              width: 700,
              maxWidth: "100%",
              "@media screen and (max-width: 1000px)": {
                width: "100%",
              },
            }}
          >
            <TextField
              fullWidth
              multiline
              id="fullWidth"
              label="About"
              value={displayNameMulti}
              onChange={handleChangeMulti}
              inputProps={{ maxLength: 200 }}
            />
            <p className="settingsParagraph">
              Characters remaining: {200 - displayNameMulti.length}
            </p>
          </Box>
        </div>
      </div>
      <CustomSnackbar {...snackbarInfo} onClose={handleSnackbarClose} />
    </>
  );
}

export default ProfileInformation;
