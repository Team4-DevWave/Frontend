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
  return (
    <>
      <Button onClick={handleClickOpen}>
        <svg
          rpl=""
          fill="currentColor"
          height="20"
          icon-name="add-outline"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 9.375h-8.375V1h-1.25v8.375H1v1.25h8.375V19h1.25v-8.375H19v-1.25Z"></path>
        </svg>
        <span className="create">Create</span>
      </Button>
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
