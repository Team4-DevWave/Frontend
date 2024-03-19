import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Dialog,
  RadioGroup,
  InputLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Header from "../components/Header";
import {
  Tabs,
  Tab,
  Badge,
  Toolbar,
  TextField,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import Posts from "../components/UserTabs/Posts";
import { GiBullyMinion } from "react-icons/gi";
import { MdFmdBad } from "react-icons/md";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CustomSnackbar from "../components/MUIEdited/CustomSnackbar";

function UserPage() {
  const user = "me";
  const avatar = "https://www.w3schools.com/howto/img_avatar.png";
  const comments = ["comment1", "comment2", "comment3"];
  const posts = [
    { title: "title1", content: "content1" },
    { title: "title2", content: "content2" },
    { title: "title3", content: "content3" },
  ];

  const [activeNavItem, setActiveNavItem] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [follow, setFollow] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [radioValue, setRadioValue] = useState("");
  const [followText, setFollowText] = useState("Follow+");
  const [blockedText, setBlockedText] = useState("Block");
  const [reason, setReason] = useState("");
  const [offense, setOffense] = useState("");
  const [snack, openSnack] = useState(false);
  // const [customState, setCustomState] = useState({open: false, message: "", severity: "info"});
  // setCustomState({...customState, });
  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveNavItem(newValue);
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
    setOffense(event.target.value);
  };
  useEffect(() => {
    if (!follow) {
      setFollowText("Unfollow-");
    } else {
      setFollowText("Follow+");
    }
    if (!blocked) {
      setBlockedText("Unblock");
    } else {
      setBlockedText("Block");
    }
  }, [follow, blocked]);

  return (
    <>
      <Header />
      <div className="SettingsHeader">
        <Avatar src={avatar} alt="user" sx={{ width: 100, height: 100 }} />
        <h2>{user}</h2>
        <Toolbar>
          <Button
            onClick={() => setFollow(!follow)}
            sx={{ margin: 2, borderRadius: 2 }}
            variant="contained"
            color="primary"
          >
            {followText}
          </Button>
          <Button
            onClick={() => setBlocked(!blocked)}
            sx={{ margin: 2, borderRadius: 2 }}
            variant="contained"
            color="primary"
          >
            {blockedText} user
          </Button>
          <Button
            onClick={() => setOpen(true)}
            sx={{ margin: 2, borderRadius: 2 }}
            variant="contained"
            color="primary"
          >
            Report User
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Report User</DialogTitle>
            <DialogContent sx={{ width: 300 }}>
              <TextField
                autoFocus
                margin="dense"
                label="Reason for Reporting (optional)"
                fullWidth
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <RadioGroup value={radioValue} onChange={handleRadioChange}>
                <InputLabel sx={{ margin: 2 }}>Type of offense</InputLabel>

                <FormControlLabel
                  value="Sexual Harassment"
                  control={<Radio />}
                  label={
                    <>
                      <MdFmdBad />
                      Sexual Harassment
                    </>
                  }
                />

                <FormControlLabel
                  value="Bullying"
                  control={<Radio />}
                  label={
                    <>
                      <GiBullyMinion />
                      Bullying
                    </>
                  }
                />

                <FormControlLabel
                  value="Inappropriate Avatar"
                  control={<Radio />}
                  label={
                    <>
                      <MdOutlineQuestionAnswer /> Inappropriate Avatar
                    </>
                  }
                />
              </RadioGroup>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={() => {
                  openSnack(true);
                  handleClose();
                }}
                disabled={!offense}
                variant="contained"
                color="error"
              >
                Report <WarningAmberIcon />
              </Button>
            </DialogActions>
          </Dialog>
          <CustomSnackbar
            isOpen={snack}
            onClose={() => openSnack(false)}
            message="Moderators will review your report"
            severity="warning"
          />
        </Toolbar>
        <Tabs
          className="settingsNavTabs"
          value={activeNavItem}
          onChange={handleTabChange}
          variant={isMobile ? "scrollable" : "standard"}
          indicatorColor="primary"
          textColor="primary"
          left
        >
          <Tab
            label="Overview"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "var(--font-small)",
              "&:hover": { color: "var(--color-black)" },
            }}
          />
          <Tab
            label="Posts"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "var(--font-small)",
              "&:hover": { color: "var(--color-black)" },
            }}
          />
          <Tab
            label="Comments"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "var(--font-small)",
              "&:hover": { color: "var(--color-black)" },
            }}
          />
        </Tabs>
        <div class="horizontalLine"></div>

        {activeNavItem === 0 && <Posts posts={posts} />}
        {activeNavItem === 1 && <Posts posts={posts} />}
        {activeNavItem === 2 && <Posts posts={posts} />}
      </div>
    </>
  );
}

export default UserPage;
