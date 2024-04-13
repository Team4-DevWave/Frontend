import React, { useEffect, useState, useContext } from "react";
import CommentContainer from "./commentContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import { LiveCommentsContext } from "./Comments.js";

function CommentFeed(postID) {
  const [comments, setComments] = useState([]);
  console.log("postID", postID.postID);
  var title;
  var content;
  const username = localStorage.getItem("username");

  const { liveComments } = useContext(LiveCommentsContext);

  useEffect(() => {
    const token = Cookies.get("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    console.log("Token:", token);

    axios
      .get(
        `http://localhost:8000/api/v1/posts/${postID.postID}/comments/
      `,
        config
      )
      .then((response) => {
        console.log("Posts data:", response.data.data.comments);

        const mappedData = response.data.data.comments
          .map((item) => {
            if (item.content) {
              return {
                id: item._id,
                user: item.user.username,
                content: item.content,
                time: item.createdAt,
                post: item.post,
                hidden: item.hidden,
                votes: item.votes,
                saved: item.saved,
                collapsed: item.collapsed,
                mentioned: item.mentioned,
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);
        console.log("mappeddata", mappedData.content);
        setComments(mappedData);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="post-feed">
      {comments.map((comment, index) => {
        console.log("comment data:", comment); // Log the comment data here
        return <CommentContainer key={index} commentData={comment} />;
      })}

      {/* Display the live comments */}
      {liveComments.map((comment, index) => {
        return <CommentContainer key={index} commentData={comment} />;
      })}
    </div>
  );
}

export default CommentFeed;

CommentFeed.propTypes = {
  postData: PropTypes.array,
};
