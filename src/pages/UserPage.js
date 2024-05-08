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

function UserPage({ toggleTheme }) {
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
      .get(`https://www.threadit.tech/api/v1/users/${username}`, {
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

  const [profilePicture, setProfilePicture] = useState(
    "https://i.redd.it/ym0nsl4yrgq71.jpg"
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
        localStorage.setItem("profilePicture", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const storedProfilePicture = localStorage.getItem("profilePicture");
    if (storedProfilePicture) {
      setProfilePicture(storedProfilePicture);
    }
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
          <div className="user-profile-data" style={{ padding: "20px" }}>
            <label htmlFor="profilePictureInput">
              <Avatar
                alt={username}
                sx={{
                  width: "100px",
                  height: "100px",
                  marginBottom: "10px",
                  cursor: "pointer", // Add cursor pointer
                }}
                src={profilePicture}
              />
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="profilePictureInput"
            />

            <Typography variant="h4" style={{ fontWeight: "bold" }}>
              u/{localStorage.getItem("username")}
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
            <OtherUserComments />
          )}
        </div>
        <div id="grid-3">
          <UserStats username={username} />
        </div>
      </div>
    </>
  );
}

export default UserPage;
