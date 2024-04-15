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
  //VARIABLES
  const { id, title } = useParams();
  const [post, setPost] = useState(null);
  console.log("Post ID:", id);

  //API

  useEffect(() => {
    const token = Cookies.get("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    console.log("Token:", token);

    axios
      .get(`https://www.threadit.tech/api/v1/posts/${id}`, config)
      .then((response) => {
        console.log("Posts data:", response.data.data.post);

        const item = response.data.data.post;
        if (item.text_body) {
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
          };
          console.log("mappeddata", mappedData.content);
          setPost(mappedData);
        }
      })
      .catch((error) => console.error("Error:", error));
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
            {post && <PostContainer postData={post} />}
            <AddComment postID={id} />
            <CommentFeed postID={id} />
          </div>
        </div>
        <div style={{ paddingBottom: "30px" }}></div>
        {/* Uncomment the following line if you have a PostContainer component */}
      </div>
    </LiveCommentsProvider>
  );
}

export default Comments;
