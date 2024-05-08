import React, { useState, useEffect } from "react";
import SocialLinks from "../Settings/Profile/SocialLinks";
import { Link } from "react-router-dom"; // Import Link from React Router
import axios from "axios";
import Cookies from "js-cookie";
import { Button, Typography, Divider } from "@mui/material";

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function RightSidebar({ postKarma, commentKarma, cakeDay, goldReceived }) {
  const [userInfo, setuserInfo] = useState();
  const [userName, setuserName] = useState();
  const [about, setAbout] = useState("");

  cakeDay = getTodayDate();
  let bearerToken = Cookies.get("token");
  const config = {
    headers: { Authorization: `Bearer ${bearerToken}` },
  };

  useEffect(() => {
    setAbout(localStorage.getItem("about") || ""); // Retrieve about from local storage

    axios
      .get("http://localhost:8000/api/v1/users/me/current", config)
      .then((response) => {
        setuserInfo(response.data.data.user);
        console.log("userInfo:", userInfo.username);
        setuserName(userInfo.username);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="right-sidebar">
      <div className="user-info-container">
        <div className="user-info">
          <Typography variant="h5">{userName}</Typography>
          <Typography variant="body1">Post Karma: {postKarma}</Typography>
          <Typography variant="body1">Comment Karma: {commentKarma}</Typography>
        </div>
        <div className="user-info">
          <Typography variant="body1">Cake Day: {cakeDay}</Typography>
          <Typography variant="body1">Gold Received: {goldReceived}</Typography>
        </div>
      </div>
      <Divider />
      <div className="about">
        <Typography variant="h5">About</Typography>
        <Typography variant="body2">{about}</Typography>
      </div>
      <Divider />
      <div className="settings">
        <Link to="/settings">
          <Button variant="contained" color="primary">
            Edit Profile
          </Button>
        </Link>
      </div>
      <Divider />
      <div className="moderation">
        <Typography variant="h5">Moderation</Typography>
        <Link to="https://www.reddit.com/user/Ok_Operation_7782/about/edit/moderation/">
          <Button variant="outlined">Mod Settings</Button>
        </Link>
      </div>

      <Divider />
      <div className="links">
        <Typography variant="h5">Links</Typography>
        <SocialLinks />
      </div>
    </div>
  );
}

export default RightSidebar;
