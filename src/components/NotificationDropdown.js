import React, { useEffect } from "react";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { set } from "lodash";

function NotificationDropDown() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get("https://www.threadit.tech/notifications").then((response) => {
      setNotifications(response.data);
      console.log(response);
    }).catch((error) => {
      console.error('Error fetching data:', error)
      });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <NotificationsIcon />
      </IconButton>
      <Menu
        sx={{
          ".MuiPaper-root": {
            borderRadius: "16px",
          },
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Typography component="h4" variant="" sx={{ marginLeft: 2 }}>
          Notifications
        </Typography>
       
        {Array.isArray(notifications) && notifications.map((notification) => (
          <MenuItem onClick={handleClose}>
            <Avatar alt={notification.alt} src={notification.src} />
            <p style={{ marginLeft: "2px", marginBottom: "0px" }}>
              {notification.content}
            </p>
          </MenuItem>
        ))}
        <MenuItem onClick={handleClose}>
          <Link
            to="/Notification"
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            See all Notifications
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}
export default NotificationDropDown;
