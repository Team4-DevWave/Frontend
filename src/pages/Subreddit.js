import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import axios from "axios";
import PostContainer from "../components/PostContainer";
import Header from "../layouts/Header";
import SideBar from "../layouts/Sidebar";
import SortOptions from "../components/SortOptions";
import "./Subreddit.css";
import Rules from "../components/Rules";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Cookies from "js-cookie";

export default function Subreddit(props) {
  const [posts, setPosts] = React.useState([]);

  const [notificationFrequency, setNotificationFrequency] = React.useState("");

  const [notificationFrequencyAnchor, setNotificationFrequencyAnchor] =
    React.useState(null);

  const [joinStatus, setJoinStatus] = React.useState("Join");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMore = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMore = () => {
    setAnchorEl(null);
  };

  const handleNotifFrequency = (event) => {
    setNotificationFrequencyAnchor(event.currentTarget);
  };

  const handleCloseNotifFrequency = () => {
    setNotificationFrequencyAnchor(null);
  };

  const handleJoin = () => {
    if (joinStatus === "Join") {
      setJoinStatus("Joined");
    } else {
      setJoinStatus("Join");
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/posts`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        console.log("Posts data:", response.data.data.posts);

        const mappedData = response.data.data.posts
          .map((item) => {
            if (item.text_body) {
              return {
                id: item._id,
                title: item.title,
                content: item.text_body,
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);
        console.log("mappeddata", mappedData.content);
        setPosts(mappedData.reverse());
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div style={{ marginTop: "80px" }}>
      <Header />
      <SideBar />

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMore}
      >
        <MenuItem onClick={handleCloseMore}>Add to favorites</MenuItem>
        <MenuItem onClick={handleCloseMore}>Mute t/{props.name}</MenuItem>
      </Menu>

      <Menu
        anchorEl={notificationFrequencyAnchor}
        keepMounted
        open={Boolean(notificationFrequencyAnchor)}
        onClose={handleCloseNotifFrequency}
      >
        <MenuItem onClick={handleCloseNotifFrequency}><NotificationsActiveIcon/>Frequent</MenuItem>
        <MenuItem onClick={handleCloseNotifFrequency}><NotificationsNoneOutlinedIcon/> Low</MenuItem>
        <MenuItem onClick={handleCloseNotifFrequency}><NotificationsOffIcon/>Off</MenuItem>
      </Menu>

      <Rules name="t/Persona3" rules="" />
      <div className="subreddit-container">
        <div className="subreddit-banner"></div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            className="subreddit-image"
            src="https://store-images.s-microsoft.com/image/apps.1955.14321970625114405.1d07d0b2-cd93-4202-aa4c-3a3b8640c4e3.3585937a-a7b5-45f4-902c-6026a8beca90?mode=scale&q=90&h=1080&w=1920&background=%23FFFFFF"
          />
          <h1 className="subreddit-title">t/{props.name}</h1>
          <div className="subreddit-features">
            <a
              className="nav-link subreddit-create-post post-in-subreddit"
              href="/CreatePost"
              data-testid="create-post-nav"
            >
              <svg
                rpl=""
                fill="currentColor"
                height="20"
                icon-name="add-outline"
                viewBox="0 0 20 20"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 9.375h-8.375V1h-1.25v8.375H1v1.25h8.375V19h1.25v-8.375H19v-1.25Z"></path>
              </svg>
              <span className="create ">Create a post</span>
            </a>
            <button onClick={handleJoin} className="join-subreddit">
              {joinStatus}
            </button>
            <button className="more-subreddit" onClick={handleMore}>
              <MoreHorizIcon />
            </button>
            <button className="bell-icon" onClick={handleNotifFrequency}>
              <svg
                class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-i4bv87-MuiSvgIcon-root"
                focusable="false"
                aria-hidden="true"
                viewBox="0 0 24 24"
                data-testid="NotificationsIcon"
              >
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2m6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1z"></path>
              </svg>
            </button>
          </div>
        </div>

        <SortOptions />
        <div className="post-feed">
          {posts.map((post, index) => {
            return <PostContainer key={index} postData={post} />;
          })}
        </div>
      </div>
    </div>
  );
}
