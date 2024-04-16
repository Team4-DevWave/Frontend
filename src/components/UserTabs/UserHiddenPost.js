import React, { useEffect, useState } from "react";
import PostContainer from "../PostContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import UserPostContainer from "./UserPostContainer";

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

    console.log("Token1:", token);

    axios
      .get("http://localhost:8000/api/v1/users/me/hidden?page=1", config)
      .then((response) => {
        console.log("Posts data:", response.data.data.posts);
        console.log("title=", response.data.data.posts[0].title);

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
                ishide: true,
                issaved: false,
                video: item.video,
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);
        console.log("mappeddata->", mappedData);
        setPosts(mappedData.reverse());
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="home-grid">
      <div id="grid-2">
        <div className="post-feed">
          {posts.map((post, index) => {
            console.log("Post data:", post); // Log the post data here
            return <UserPostContainer key={index} postData={post} />;
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
