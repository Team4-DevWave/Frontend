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

export default function FoundCommunities(props) {
  const communityData = props.communityData;
  useEffect(() => {
    console.log("communityData", communityData);
  }, []);

  if (!communityData || communityData.length === 0) {
    return (
        <Typography 
        sx={{ textAlign: "center"}
           }
        variant="h6" gutterBottom>
           No communities found
         </Typography>
    );
  } else {
    return (

      <List>
        {communityData.map((community) => (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={community.name} src="" />
              </ListItemAvatar>
              <ListItemText
                primary={"t/"+community.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                     Members: {community.members}
                    </Typography>
                    <Typography
                      sx={{ display: "block" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                     Posts: {community.posts}
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
