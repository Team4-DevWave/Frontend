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
import axios from "axios";
import Header from "../layouts/Header";
import GuestHeader from "../layouts/GuestHeader";
import Cookies from "js-cookie";

export default function AllCommunities(props) {
  const [communityData, setCommunityData] = useState([]);
  const navigate = useNavigate();

  const fetchCommunities = async (page = 1) => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/r/all?page=${page}`
    );
    const data = response.data.data.subreddits;

    // If the current page's data is empty, stop fetching
    if (data.length === 0) {
      return;
    }

    setCommunityData((prevData) => [...prevData, ...data]);

    // Fetch the next page
    fetchCommunities(page + 1);
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  useEffect(() => {
    console.log("communityData", communityData);
  }, []);

  if (!communityData || communityData.length === 0) {
    return (
      <div className="home-grid">
        <div id="grid-0">
          {Cookies.get("token") ? (
            <Header toggleTheme={props.toggleTheme} />
          ) : (
            <GuestHeader />
          )}
        </div>

        <div id="grid-2">
          <Typography sx={{ textAlign: "center" }} variant="h6" gutterBottom>
            No communities found
          </Typography>
        </div>
      </div>
    );
  } else {
    return (
      <div className="home-grid">
        <div id="grid-0">
          {Cookies.get("token") ? (
            <Header toggleTheme={props.toggleTheme} />
          ) : (
            <GuestHeader />
          )}
        </div>

        <div id="grid-2">
          <List
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            {communityData.map((community) => (
              <>
                <Link
                  to={`/r/${community.name}`}
                  style={{ textDecoration: "none" }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={community.name}
                        src={community.srLooks.icon}
                      />
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
                    <Divider variant="inset" component="li" />
                  </ListItem>
                </Link>
              </>
            ))}
          </List>
        </div>
      </div>
    );
  }
}
