import styles from "./Profile.module.css";
import Header from "../layouts/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Avatar,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import OverView from "../components/UserTabs/Overview";
import UserPost from "../components/UserTabs/UserPost";
import UserComments from "../components/UserTabs/UserComments";
import UserSavedPost from "../components/UserTabs/UserSavedPost";
import UserHidden from "../components/UserTabs/UserHiddenPost";
import Upvoted from "../components/UserTabs/Upvoted";
import Downvoted from "../components/UserTabs/Downvoted";
import UserStats from "../layouts/UserStats";
import Sidebar from "../layouts/Sidebar";
import RightSidebar from "../components/userProfile/RightSidebar";

import { useParams } from "react-router-dom";

function Profile({ toggleTheme }) {
  const [value, setValue] = React.useState(0);
  const [username, setUsername] = useState("moashraf");
  const [userFound, setUserFound] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [userData, setUserData] = useState({
    username: "Mahmoud",
    postKarma: 1,
    commentKarma: 2,
    cakeDay: "",
    goldReceived: 20,
    socialLinks: [],
    moderationTools: [],
    overviewData: null,
    comments: [],
    upvotedComments: [],
    downvotedComments: [],
    hiddenPosts: [],
  });
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await axios.get(
          "http://localhost:8000/api/v1/users/me/current"
        );
        const user = userResponse.data.data;

        // Fetch user overview
        const overviewResponse = await axios.get(
          `http://localhost:8000/api/v1/users/${user.username}/overview?page=1`
        );
        const overviewData = overviewResponse.data.data;

        // Fetch user comments
        const commentsResponse = await axios.get(
          `http://localhost:8000/api/v1/users/${user.username}/comments`
        );
        const comments = commentsResponse.data.data.comments;

        // Fetch user upvotes
        const upvotesResponse = await axios.get(
          "http://localhost:8000/api/v1/users/me/upvoted?page=1"
        );
        const upvotedComments = upvotesResponse.data.data.comments;

        // Fetch user downvotes
        const downvotesResponse = await axios.get(
          "http://localhost:8000/api/v1/users/me/downvoted?page=1"
        );
        const downvotedComments = downvotesResponse.data.data.comments;

        // Fetch user hidden posts
        const hiddenResponse = await axios.get(
          "http://localhost:8000/api/v1/users/me/hidden?page=1"
        );
        const hiddenPosts = hiddenResponse.data.data.posts;

        const today = new Date();
        const options = { year: "numeric", month: "long", day: "numeric" };

        // Update state with fetched data
        setUserData({
          username: user.username,
          postKarma: user.postKarma,
          commentKarma: user.commentKarma,
          cakeDay: today.toLocaleDateString(undefined, options),
          goldReceived: user.goldReceived,
          socialLinks: user.socialLinks,
          moderationTools: user.moderationTools,
          overviewData,
          comments,
          upvotedComments,
          downvotedComments,
          hiddenPosts,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
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
      userData.profilePicture = storedProfilePicture;
    }
  }, []);

  return (
    <div className={styles.userProfileGrid}>
      <div id="user-profile-grid-0">
        <Header toggleTheme={toggleTheme} />
      </div>
      <div className={styles.userProfileSidebar} id="user-profile-grid-1">
        <Sidebar />
      </div>
      <div
        className={styles.userProfileDataContainer}
        id="user-profile-grid-2"
        style={{
          borderRadius: "50px",
        }}
      >
        <div className={styles.userProfileData} style={{ padding: "20px" }}>
          <label htmlFor="profilePictureInput">
            <Avatar
              alt={username}
              sx={{
                width: "100px",
                height: "100px",
                marginBottom: "10px",
                cursor: "pointer", // Add cursor pointer
              }}
              src={userData.profilePicture}
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
          variant={isMobile ? "scrollable" : "standard"}
          indicatorColor="primary"
          textColor="primary"
          left
        >
          <Tab label="Overview" />
          <Tab label="Posts" />
          <Tab label="Comments" />
          <Tab label="Saved" />
          <Tab label="Hidden" />
          <Tab label="Upvoted" />
          <Tab label="Downvoted" />
        </Tabs>
        <hr />
        {value === 0 && <OverView />}
        {value === 1 && <UserPost />}
        {value === 2 && <UserComments />}
        {value === 3 && <UserSavedPost />}
        {value === 4 && <UserHidden />}
        {value === 5 && <Upvoted />}
        {value === 6 && <Downvoted />}
      </div>
      <div id="user-profile-grid-3">
        <RightSidebar
          username={userData.username}
          postKarma={userData.postKarma}
          commentKarma={userData.commentKarma}
          cakeDay={userData.cakeDay}
          goldReceived={userData.goldReceived}
          socialLinks={userData.socialLinks}
          moderationTools={userData.moderationTools}
        />
      </div>
    </div>
  );
}

export default Profile;
