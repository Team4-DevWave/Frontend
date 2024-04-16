import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import UserPostContainer from "./UserPostContainer";

function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [noPosts, setNoPosts] = useState(false); // State to track if there are no saved posts

  useEffect(() => {
    const token = Cookies.get("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get("http://localhost:8000/api/v1/users/me/saved?page=1", config)
      .then((response) => {
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
                spoiler: true,
                nsfw: item.nsfw,
                locked: item.locked,
                approved: item.approved,
                mentioned: item.mentioned,
                username: item.userID.username,
                commentsCount: item.commentsCount,
                image: item.image,
                video: item.video,
                issaved: true,
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);

        if (mappedData.length === 0) {
          setNoPosts(true); // Set noPosts state to true if there are no saved posts
        }

        setPosts(mappedData.reverse());
      })
      .catch((error) => {
        console.error("Error:", error);
        setNoPosts(true); // Set noPosts state to true if there's an error
      });
  }, []);

  return (
    <div className="home-grid">
      <div id="grid-2">
        <div className="post-feed">
          {/* Check if noPosts is true and render the appropriate message */}
          {noPosts ? (
            <h1 className="deleted-post">No saved posts found</h1>
          ) : (
            // Render the saved posts
            posts.map((post, index) => {
              console.log("Post data:", post); // Log the post data here
              return <UserPostContainer key={index} postData={post} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default PostFeed;

PostFeed.propTypes = {
  postData: PropTypes.array,
};
