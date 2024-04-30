import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

import {
  Card,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  InputLabel,
} from "@mui/material";
import Button from "@mui/material/Button";
import MoreVert from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import "./UserStats.css";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GiBullyMinion } from "react-icons/gi";
import { MdFmdBad } from "react-icons/md";
import { MdOutlineQuestionAnswer } from "react-icons/md";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CustomSnackbar from "../components/MUIEdited/CustomSnackbar";

export default function UserStats(props) {
  const username = props.username;
  const [stats, setStats] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openReport, setOpenReport] = React.useState(false);
  const [reason, setReason] = React.useState("");

  const [radioValue, setRadioValue] = React.useState("");
  const [offense, setOffense] = React.useState("");
  const [followed, setFollowed] = useState(false);
  
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
    setOffense(event.target.value);
  };

  const openSnack = (bool) => {
    setOpenReport(bool);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const token = Cookies.get("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(`http://localhost:8000/api/v1/users/${username}/about`, config)
      .then((response) => {
        setStats(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

  return (
    <div style={{ marginLeft: "10px", marginTop: "20px" }}>
      <Dialog open={openReport} onClose={handleCloseReport}>
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

      <Menu
        id="dropdown-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Share</MenuItem>
        <MenuItem onClick={handleClose}>Send a Message</MenuItem>
        <MenuItem onClick={handleClose}>Block Account</MenuItem>
        <MenuItem onClick={()=>{
            handleClose();
            setOpenReport(true);
        }}>Report Profile</MenuItem>
      </Menu>
      <Card
        sx={{
          width: "100%",
          padding: "1rem",
          marginBottom: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
          borderRadius: "25px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <span style={{ display: "inline" }}>
          <div className="title-and-options">
            <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
              u/{username}
            </Typography>
            <Button
              aria-controls="dropdown-menu"
              aria-haspopup="true"
              onClick={handleClick}
              sx={{
                backgroundColor: "#f5f5f5",
                color: "#000",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
                borderRadius: "50px",
                border: "1px solid #000",
                boxShadow: "none",
                padding: "0",
                minWidth: "0",
                marginRight: "0.5rem",
              }}
            >
              <MoreVert />
            </Button>{" "}
          </div>
          <div>
            <Button
              endIcon={<AddCircleOutlineTwoToneIcon />}
              sx={{
                backgroundColor: "#0079d3",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#005c9e",
                },
                borderRadius: "50px",
                padding: "0.5rem 1rem",
                marginTop: "1rem",
              }}
            >
              Follow
            </Button>

            <Button
              endIcon={<IoChatbubbleEllipsesOutline />}
              sx={{
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
                borderRadius: "50px",
                border: "1px solid #000",
                padding: "0.5rem 1rem",
                marginTop: "1rem",
                marginLeft: "1rem",
              }}
            >
              Chat
            </Button>
          </div>

          <div className="stats">
            <div>post karma: {stats.postKarma}</div>
            <div>comment karma: {stats.commentKarma}</div>
            <div>
              Cake Day:
              {/* {stats.cakeDay.slice(0, 10)} */}
            </div>
          </div>
        </span>
        <hr />
        <Typography
          variant="h6"
          sx={{ marginBottom: "1rem", fontSize: "15px" }}
        >
          Moderator of these communities:
        </Typography>
      </Card>
    </div>
  );
}
