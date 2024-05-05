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
import SideBar from "../../layouts/Sidebar";
import "./Comments.css";
import LoadingScreen from ".././LoadingScreen";
import CommentFeed from "./commentFeed.js";
import AddComment from "./AddComment.js";

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

function Comments() {
  console.log("Comments rendered");
  //VARIABLES
  const { id, title } = useParams();
  const [post, setPost] = useState(null);
  console.log("Post ID:", id);
  const token = Cookies.get("token");
  //API

  useEffect(() => {
    let config = {};

    if (token) {
      config = {
        headers: { Authorization: `Bearer ${token}` },
      };
    }

    console.log("Token:", token);

    axios
      .get(`http://localhost:8000/api/v1/posts/${id}`, config)
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
          console.log("mappeddata", mappedData.content);
          setPost(mappedData);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [id]);

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <LiveCommentsProvider>
      <div>
        <div className="home-grid">
          <div id="grid-0">
            <Header />
          </div>
          <div id="grid-1">
            <SideBar />
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
        </div>
        <div style={{ paddingBottom: "30px" }}></div>
        {/* Uncomment the following line if you have a PostContainer component */}
      </div>
    </LiveCommentsProvider>
  );
}

export default React.memo(Comments);
