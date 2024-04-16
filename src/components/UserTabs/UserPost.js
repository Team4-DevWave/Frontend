import React, { useEffect, useState } from "react";
import PostContainer from "../PostContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import UserPostContainer from "./UserPostContainer";
import MyPostsCont from "./MyPostsCont";

function PostFeed() {
  const [posts, setPosts] = useState([]);

  var title;
  var content;
  const username = localStorage.getItem("username");

  useEffect(() => {
    const token = Cookies.get("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log("Token11:", token);
    console.log("username:", username);

    axios
      .get(`http://localhost:8000/api/v1/users/${username}/posts`, config)
      .then((response) => {
        console.log("Posts data:", response.data.data.posts);

        const mappedData = response.data.data.posts
          .map((item) => {
            if (item.text_body) {
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
                username: item.userID.username,
                commentsCount: item.commentsCount,
                image: item.image,
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);
        console.log("mappeddataaaaaaaaaaaaaaaa", mappedData.title);
        setPosts(mappedData.reverse());
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="profile-grid">
      <div id="profgrid-2">
        <div className="post-feed">
          {posts.map((post, index) => {
            console.log("Post data:", post); // Log the post data here
            return <MyPostsCont key={index} postData={post} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default PostFeed;

PostFeed.propTypes = {
  postData: PropTypes.array,
};
