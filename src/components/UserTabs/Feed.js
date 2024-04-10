import React, { useEffect, useState } from "react";
import PostContainer from "../PostContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";

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

  console.log("Token:", token);

  axios
    .get("http://localhost:8000/api/v1/posts",config)
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
    <div className="post-feed">
      {posts.map((post, index) => {
        console.log("Post data:", post); // Log the post data here
        return <PostContainer key={index} postData={post} />;
      })}
    </div>
  );
}

export default PostFeed;

PostFeed.propTypes = {
  postData: PropTypes.array,
};
