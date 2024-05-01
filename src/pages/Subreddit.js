import React from "react";
import PropTypes, { bool } from "prop-types";
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
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Cookies from "js-cookie";
import LoadingScreen from "../components/LoadingScreen";
import SubredditRules from "../components/SubredditRules";
import { useParams } from "react-router-dom";

export default function Subreddit(props) {
  const { subredditName } = useParams();
  const [sortOption, setSortOption] = React.useState("best");
  const [validSubreddit, setValidSubreddit] = React.useState(false);
  useEffect(() => {
    console.log("Subreddit name:", subredditName);
    axios
      .get(`http://localhost:8000/api/v1/r/user_subreddits`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        console.log("User subreddits:", response.data.data.userSubreddits);
        const userSubreddits = response.data.data.userSubreddits;
        console.log(
          userSubreddits.some((subreddit) => subreddit.name === subredditName)
        );
        if (
          userSubreddits.some((subreddit) => subreddit.name === subredditName)
        ) {
          setJoinStatus("Joined");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const [subredditData, setSubredditData] = React.useState({});
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
      axios
        .post(
          `http://localhost:8000/api/v1/r/${subredditName}/subscribe`,
          {
            status: "join",
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        )
        .then((response) => {
          console.log("Join response:", response);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setJoinStatus("Join");
      axios
        .delete(
          `http://localhost:8000/api/v1/r/${subredditName}/unsubscribe`,

          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        )
        .then((response) => {
          console.log("Unsubscribe response:", response);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`https://www.threadit.tech/api/v1/r/${subredditName}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((response) => {
        console.log("Subreddit data:", response.data.data.subreddit);
        setSubredditData(response.data.data.subreddit);
        setValidSubreddit(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setValidSubreddit(false);
      });
  }, []);

  useEffect(() => {
    console.log("Sort option changed:", sortOption);
    axios
      .get(
        `http://localhost:8000/api/v1/r/${subredditName}/posts/${sortOption}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      )
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
                votes: item.votes,
                numviews: item.numViews,
                spoiler: item.spoiler,
                nsfw: item.nsfw,
                locked: item.locked,
                approved: item.approved,
                mentioned: item.mentioned,
                username:
                  item.userID.username || item.userID.parentPost.username,
                commentsCount: item.commentsCount,
                image: item.image,
                video: item.video,
                subredditID: item.subredditID,
                ishide: false,
                issaved: false,
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
  }, [sortOption]);

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const [isSticky, setSticky] = React.useState(false);

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

  if (loading) {
    return <LoadingScreen />;
  }
  if (!validSubreddit) {
    return <div>Subreddit not found</div>;
  }

  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMore}
      >
        <MenuItem onClick={handleCloseMore}>Add to favorites</MenuItem>
        <MenuItem onClick={handleCloseMore}>Mute t/{subredditName}</MenuItem>
      </Menu>

      <Menu
        anchorEl={notificationFrequencyAnchor}
        keepMounted
        open={Boolean(notificationFrequencyAnchor)}
        onClose={handleCloseNotifFrequency}
      >
        <MenuItem onClick={handleCloseNotifFrequency}>
          <NotificationsActiveIcon />
          Frequent
        </MenuItem>
        <MenuItem onClick={handleCloseNotifFrequency}>
          <NotificationsNoneOutlinedIcon /> Low
        </MenuItem>
        <MenuItem onClick={handleCloseNotifFrequency}>
          <NotificationsOffIcon />
          Off
        </MenuItem>
      </Menu>

      <div class="angry-grid">
        <div id="item-0">
          <Header />
        </div>
        <div id="item-1">
          <SideBar />
        </div>
        <div id="item-2">
          <SortOptions onSortOptionChange={setSortOption} />
          <div className="post-feed">
            {posts.map((post, index) => {
              return <PostContainer key={index} postData={post} />;
            })}
          </div>
        </div>
        <div id="item-3">
          <SubredditRules isSticky={isSticky} />
        </div>
        <div id="item-4">
          {" "}
          <div className="subreddit-container">
            <div className="subreddit-banner"></div>
            <div className="internal-banner-strip">
              <img
                className="subreddit-image"
                src={subredditData.srLooks.icon}
              />
              <div className="subreddit-strip">
                <h1 className="subreddit-title">t/{subredditData.name}</h1>
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
                  {joinStatus === "Joined" && (
                    <button
                      className="bell-icon"
                      onClick={handleNotifFrequency}
                    >
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
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Subreddit.propTypes = {
  /** Subreddit name */
  name: PropTypes.string,
  /** Subreddit banner */
  banner: PropTypes.string,
  /** Subreddit description */
  description: PropTypes.string,
  /** Subreddit rules */
  rules: PropTypes.array,
  /** Subreddit members */
  members: PropTypes.number,
  /** Subreddit rank */
  rank: PropTypes.string,
  /** Subreddit moderators */
  moderators: PropTypes.array,
  /** Subreddit online members */
  online: PropTypes.number,
  /** Subreddit posts */
  posts: PropTypes.array,
  /** Subreddit join status */
  joinStatus: PropTypes.bool,
  /** Subreddit notification frequency */
  notificationFrequency: PropTypes.string,
};
