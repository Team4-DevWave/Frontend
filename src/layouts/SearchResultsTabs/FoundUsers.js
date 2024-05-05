import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { List, ListItem } from "@mui/material";

import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";

export default function FoundUsers(props) {
  const userData = props.userData;
  useEffect(() => {
    console.log("UserData", userData);
  }, []);

  if (!userData || userData.length === 0) {
    return (
      <Typography sx={{ textAlign: "center" }} variant="h6" gutterBottom>
        No users found
      </Typography>
    );
  } else {
    return (
      <List>
        {userData.map((user) => (
          <>
            <Link
              to={`/user/${user.username}`}
              style={{ textDecoration: "none" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={user.username}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRivmMwmXmBhlRVSu_qAMz_0UjdC8V2OES0GQGJ5L9rCQ&s"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={"u/" + user.username}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "block" }}
                        component="span"
                        variant="body2"
                      >
                        Karma: {user.karma.posts + user.karma.comments}
                      </Typography>
                      <Typography
                        sx={{ display: "block" }}
                        component="span"
                        variant="body2"
                      >
                        {user.country}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Link>
            <Divider variant="inset" component="li" />
          </>
        ))}
      </List>
    );
  }
}
