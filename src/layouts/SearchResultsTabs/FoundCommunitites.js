import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";

export default function FoundCommunities(props) {
  const navigate = useNavigate();
  const communityData = props.communityData;
  useEffect(() => {
    console.log("communityData", communityData);
  }, []);

  if (!communityData || communityData.length === 0) {
    return (
      <Typography sx={{ textAlign: "center" }} variant="h6" gutterBottom>
        No communities found
      </Typography>
    );
  } else {
    return (
      <List>
        {communityData.map((community) => (
          <
          >
             <Link to={`/r/${community.name}`} style={{textDecoration:"none"}}>
            <ListItem alignItems="flex-start">
             
                <ListItemAvatar>
                  <Avatar alt={community.name} src={community.srLooks.icon} />
                </ListItemAvatar>
            

              <ListItemText
                primary={"t/" + community.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Members: {community.members.length}
                    </Typography>
                    <Typography
                      sx={{ display: "block" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    ></Typography>
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
