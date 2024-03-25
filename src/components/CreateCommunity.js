import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  Radio,
  RadioGroup,
  InputLabel,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import axios from "axios";

function CreateCommunity() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const [communityName, setCommunityName] = useState("");
  const handleNameChange = (e) => {
    setCommunityName(e.target.value);
  };

  const [radioValue, setRadioValue] = useState("");

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const [checked, setChecked] = useState(false);
  const toggleChecked = (e) => {
    setChecked(e.target.checked);
  };
  const submitCommunity = () => {
    axios
      .post("http://localhost:8080/community", {
        name: communityName,
        type: radioValue,
        mature: checked,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Community is created");
        } else {
          console.log("Community is not created");
        }
        console.log(response);
      });
  };
  return (
    <>
      <div onClick={handleClickOpen}>
        <span className="create">Create a community</span>
      </div>
      <Dialog
        sx={{ ".MuiPaper-root": { borderRadius: "16px" } }}
        open={open}
        onClose={handleCloseModal}
      >
        <DialogTitle>Create Community</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Build and grow a community about something you care about. We'll
            help you set things up.
          </DialogContentText>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">t/</InputAdornment>
              ),
            }}
            sx={{ ".MuiOutlinedInput-root": { borderRadius: "8px" } }}
            value={communityName}
            onChange={handleNameChange}
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
          />
          <RadioGroup value={radioValue} onChange={handleRadioChange}>
            <InputLabel sx={{ margin: 2 }}>Community Type</InputLabel>

            <FormControlLabel
              value="public"
              control={<Radio />}
              label={
                <>
                  <PublicIcon />
                  Public
                </>
              }
            />
            <p style={{ marginLeft: "20px", fontSize: "small" }}>
              Anyone can view, post, and comment to this community
            </p>

            <FormControlLabel
              value="restricted"
              control={<Radio />}
              label={
                <>
                  <VisibilityIcon />
                  Restricted
                </>
              }
            />
            <p style={{ marginLeft: "20px", fontSize: "small" }}>
              Anyone can view, but only approved users can contribute
            </p>
            <FormControlLabel
              value="private"
              control={<Radio />}
              label={
                <>
                  <VpnLockIcon /> Private
                </>
              }
            />
            <p style={{ marginLeft: "20px", fontSize: "small" }}>
              Only approved users can view and contribute to this community
            </p>
          </RadioGroup>
          <FormControlLabel
            control={<Switch defaultChecked />}
            checked={checked}
            onChange={toggleChecked}
            label="Mature (18+)"
          />
          <p style={{ marginLeft: "20px", fontSize: "small" }}>
            Must be over 18 to view and contribute
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button
            disabled={!communityName || !radioValue}
            onClick={handleCloseModal}
          >
            {(communityName && <>Create t/{communityName}</>) || "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CreateCommunity;
