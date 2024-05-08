import React, { useState, useEffect } from "react";
import Header from "../layouts/Header";
import Sidebar from "../layouts/Sidebar";
import { Pagination, Tab, Tabs, Typography, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";
import OtherUserOverview from "../layouts/OtherUserTabs/OtherUserOverview";
import OtherUserPosts from "../layouts/OtherUserTabs/OtherUserPosts";
import OtherUserComments from "../layouts/OtherUserTabs/OtherUserComments";
import UserStats from "../layouts/UserStats";

function UserPage({toggleTheme}) {
  const [value, setValue] = React.useState(0);
  const { username } = useParams();
  const [userData, setUserData] = useState({});
  const [userFound, setUserFound] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/users/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.user);
        setUserData(res.data.data.user);
        setUserFound(true);
      })
      .catch((err) => {
        console.log(err);
        setUserFound(false);
      });
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div class="home-grid">
        <div id="grid-0">
          <Header toggleTheme={toggleTheme} />
        </div>
        <div id="grid-1">
          <Sidebar />
        </div>
        <div
          id="grid-2"
          style={{
           
            borderRadius: "50px",
          
          }}
        >
          <div className="user-profile-data" style={{padding: "20px"}}>
            <Avatar
              alt={username}
              sx={{
                width: "100px",
                height: "100px",

                marginBottom: "10px",
              }}
              src={
                userData.profilePicture || "https://i.redd.it/ym0nsl4yrgq71.jpg"
              }
            />
            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              u/{username}
            </Typography>
          </div>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Overview" />
            <Tab label="Posts" />
            <Tab label="Comments" />
          </Tabs>
          <hr />
          {value === 0 ? (
            <OtherUserOverview />
          ) : value === 1 ? (
            <OtherUserPosts />
          ) : (
           <OtherUserComments/>
          )}
        </div>
        <div id="grid-3" >
          <UserStats username={username} />
        </div>
      </div>
    </>
  );
}

export default UserPage;
