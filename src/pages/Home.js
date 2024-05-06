import Header from "../layouts/Header";
import React, { useEffect, useState } from "react";
import SideBar from "../layouts/Sidebar";
import PostFeed from "../components/UserTabs/Feed";
import SortOptions from "../components/SortOptions";
import LoadingScreen from "../components/LoadingScreen";
import "./Home.css";
import Cookies from "js-cookie";
import GuestHeader from "../layouts/GuestHeader";
import GuestSideBar from "../layouts/GuestSidebar";
import RecentPosts from "../components/RecentPosts";
import axios from "axios";

// import Overlay from "../components/overlay/Overlay.js";
// import IconButton from '@mui/material/IconButton';
// import ChatIcon from '@mui/icons-material/Chat';

function Home({ toggleTheme }) {
  const [loading, setLoading] = React.useState(true);
  const [showOverlay, setShowOverlay] = useState(false);

  const [isSticky, setSticky] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        console.log("Sticky");
        setSticky(true);
      } else {
        console.log("Not sticky");
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/users/me/history/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        console.log("Posts:", response.data.data.posts);
        const fetchedPosts = response.data.data.posts;

        const filteredPostData = fetchedPosts
          .map((item) => {
            if (item) {
              return {
                id: item._id,
                title: item.title,
                content: item.text_body,
                time: item.postedTime,
                votes: item.votes.upvotes,
                numviews: item.numViews,
                spoiler: item.spoiler,
                mentioned: item.mentioned,
                userpic: item.userID.profilePicture,
                username:
                  item.userID.username || item.userID.parentPost.username,
                commentsCount: item.commentsCount,
                image: item.image,
                video: item.video,
                subredditID: item.subredditID,
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);

        setPosts(filteredPostData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // const [showOverlay, setShowOverlay] = useState(false);
  // const toggleOverlay = () => {
  //   setShowOverlay(!showOverlay);
  // };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="home-grid">
      {/* <IconButton onClick={toggleOverlay} className="chatIconInHome">
        <ChatIcon />
      </IconButton>
      {showOverlay && <Overlay toggleOverlay={toggleOverlay} showOverlay={showOverlay} />} */}

      <div id="grid-0">
        {Cookies.get("token") ? (
          <Header toggleTheme={toggleTheme} />
        ) : (
          <GuestHeader toggleTheme={toggleTheme} />
        )}
      </div>
      <div id="grid-1">
        {Cookies.get("token") ? <SideBar /> : <GuestSideBar />}
      </div>
      <div id="grid-2">
        <div className="post-feed">
          <PostFeed />
        </div>
      </div>
      <div id="item-3">
        <RecentPosts isSticky={isSticky} posts={posts} />
      </div>
    </div>
  );
}
export default Home;
