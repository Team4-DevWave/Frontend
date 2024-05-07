import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  createContext,
} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostContainer from "../PostContainer"; // Uncomment this if you have a PostContainer component
import GuestPostContainer from "../GuestPostContainer.js";
import Cookies from "js-cookie";
import Header from "../../layouts/Header";
import GuestHeader from "../../layouts/GuestHeader.js";
import SideBar from "../../layouts/Sidebar";
import GuestSideBar from "../../layouts/GuestSidebar.js";
import "./Comments.css";
import LoadingScreen from ".././LoadingScreen";
import CommentFeed from "./commentFeed.js";
import AddComment from "./AddComment.js";
import SubredditRules from "../SubredditRules.js";

export const LiveCommentsContext = createContext(null);
export const LiveCommentsProvider = ({ children }) => {
  const [liveComments, setLiveComments] = useState([]);

  const addLiveComment = (comment) => {
    setLiveComments([...liveComments, comment]);
  };
  return (
    <LiveCommentsContext.Provider value={{ liveComments, addLiveComment }}>
      {children}
    </LiveCommentsContext.Provider>
  );
};

function Comments({ toggleTheme }) {
  console.log("Comments rendered");
  //VARIABLES
  const { id, title } = useParams();
  const [post, setPost] = useState(null);
  console.log("Post ID:", id);
  const token = Cookies.get("token");
  //API
  const [subredditData, setSubredditData] = React.useState({});
  const [validSubreddit, setValidSubreddit] = React.useState(false);

  useEffect(() => {
    let config = {};

    if (token) {
      config = {
        headers: { Authorization: `Bearer ${token}` },
      };
    }

    console.log("Token:", token);

    axios
      .get(`https://www.threadit.tech/api/v1/posts/${id}`, config)
      .then((response) => {
        console.log("Posts data:", response.data.data.post);

        const item = response.data.data.post;
        if (item) {
          const mappedData = {
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
            username: item.userID.username,
            commentsCount: item.commentsCount,
            image: item.image,
            video: item.video,
            subredditID: item.subredditID,
            ishide: false,
            issaved: false,
            userVote: item.userVote,
            Link: item.url,
          };
          console.log("mappeddata", mappedData.subredditID);
          setPost(mappedData);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  useEffect(() => {
    if (post && post.subredditID) {
      axios
        .get(`https://www.threadit.tech/api/v1/r/${post.subredditID.name}`, {
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
    }
  }, [post]);

  const [loading, setLoading] = React.useState(true);
  const [isSticky, setSticky] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

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

  return (
    <LiveCommentsProvider>
      <div>
        <div className="home-grid">
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
            {post &&
              (token ? (
                <PostContainer postData={post} />
              ) : (
                <GuestPostContainer postData={post} />
              ))}
            {token && <AddComment postID={id} lock={post.locked} />}
            <CommentFeed postID={id} />
          </div>
          {post && post.subredditID && (
            <div id="item-3">
              <SubredditRules
                isSticky={isSticky}
                status={subredditData.status}
                members={subredditData.members.length}
                rules={subredditData.rules}
                moderators={subredditData.moderators}
                people={subredditData.members}
              />
            </div>
          )}
        </div>
        <div style={{ paddingBottom: "30px" }}></div>
        {/* Uncomment the following line if you have a PostContainer component */}
      </div>
    </LiveCommentsProvider>
  );
}

export default React.memo(Comments);
