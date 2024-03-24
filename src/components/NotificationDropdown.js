import React from "react";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

function NotificationDropDown() {
  const [anchorEl, setAnchorEl] = useState(null);

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
        <MenuItem onClick={handleClose}>
          <Avatar alt="Travis Howard" src="../images/comment.png" />
          <p style={{ marginLeft: "2px", marginBottom: "0px" }}>
            Travis upvotex your post!
          </p>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar alt="Karen" src="../images/comment.png" />
          <p style={{ marginLeft: "2px", marginBottom: "0px" }}>
            Travis upvotex your post!
          </p>
        </MenuItem>
        <hr />
        <MenuItem onClick={handleClose}>
          {" "}
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
