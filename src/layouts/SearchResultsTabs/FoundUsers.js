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
     <Typography 
     sx={{ textAlign: "center"}
        }
     variant="h6" gutterBottom>
        No users found
      </Typography>
    );
  } else {
    return (
      // <List>
      // {userData.map((user) => (
      //     <ListItem key={user.id}>
      //          <img
      //           src={process.env.PUBLIC_URL + "/images/erenyega.jpg"}
      //           alt="profile pic"
      //           className="rounded-circle"
      //           width="30px"
      //           style={{ marginRight: "10px" }}
      //         />
      //         <h4 style={{marginRight: "20px"}}>{user.username}</h4>
      //         <Link
      //         style={{ textDecoration: "none" }}
      //         to={`/profile/${user.id}`}>View Profile</Link>
      //     </ListItem>
      // ))}
      // </List>
      <List>
        {userData.map((user) => (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={user.username} src={user.profile_picture} />
              </ListItemAvatar>
              <ListItemText
                primary={"u/"+user.username}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        ))}
      </List>
    );
  }
}
