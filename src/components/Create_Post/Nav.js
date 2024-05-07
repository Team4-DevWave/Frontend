import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "@mui/material";
import Post from "./Post";
import Link from "./Link";
import Poll from "./Poll";
import Img from "./Img";
import Header from "../../layouts/Header";
import Cookies from "js-cookie";
import axios from "axios";
import "./Nav.css";
//import GuestSideBar from "../layouts/GuestSidebar";
import GuestSideBar from "../../layouts/GuestSidebar";
import SideBar from "../../layouts/Sidebar";
import GuestHeader from "../../layouts/GuestHeader";

function Nav({ toggleTheme }) {

  const [activeNavItem, setActiveNavItem] = useState(0);
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState("");
  const username = localStorage.getItem("username");


  const token = Cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleTabChange = (event, newValue) => {
    setActiveNavItem(newValue);
  };
  const handleCommunityChange = (event) => {
    setSelectedCommunity(event.target.value);
    localStorage.setItem("communitynamechoosed", selectedCommunity);

  };

  useEffect(() => {
    localStorage.setItem("communitynamechoosed", selectedCommunity);

    console.log("selectedCommunity===========", selectedCommunity);
    axios.get("https://www.threadit.tech/api/v1/r/user_subreddits", config)
      .then((response) => {
        console.log("Response:", response.data);
        // Extract the names of communities from the response
        const communityNames = response.data.data.userSubreddits.map((community) => community.name);
        console.log("nameeeeeeeeeeeeeeeeeee:", communityNames);

        setCommunities(communityNames);
      })
      .catch((error) => {
        console.error("Error fetching communities:", error);
      });
  }, [selectedCommunity]);





  return (
    <>
      <div className="home-gridd">

        <div id="gridd-0">

          {Cookies.get("token") ? <Header toggleTheme={toggleTheme} /> : <GuestHeader />}
        </div>      <div id="grid-1">
          {Cookies.get("token") ? <SideBar /> : <GuestSideBar />}
        </div>
        <div className="container" id="gridd-2">
          <div className="content">
            <div className="draft">
              <h1 className="title">Create a post</h1>
              <div className="horizontalLine"></div>
              <div className="dropdown-container">
                <select
                  id="community-dropdown"
                  className="dropdown-select"
                  value={selectedCommunity}
                  onChange={handleCommunityChange}
                >
                  <option disabled value="">
                    your profile
                  </option>
                  <option value="username">u/{username}</option>
                  <option disabled value="">
                    your Communities
                  </option>
                  {communities.length > 0 &&
                    communities.map((community, index) => (
                      <option key={index} value={community}>
                        {community}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <Tabs className="navListsizeLg" value={activeNavItem} onChange={handleTabChange}>
              <Tab
                label="Post"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "var(--font-medium)",
                  "&:hover": { color: "var(--color-black)" },
                }}
              />
              <Tab
                label="Image & Video"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "var(--font-medium)",
                  "&:hover": { color: "var(--color-black)" },
                }}
              />
              <Tab
                label="Link"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "var(--font-medium)",
                  "&:hover": { color: "var(--color-black)" },
                }}
              />
              <Tab
                label="Poll"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "var(--font-medium)",
                  "&:hover": { color: "var(--color-black)" },
                }}
              />
            </Tabs>

            {activeNavItem === 0 && <Post />}
            {activeNavItem === 1 && <Img />}
            {activeNavItem === 2 && <Link />}
            {activeNavItem === 3 && <Poll />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
