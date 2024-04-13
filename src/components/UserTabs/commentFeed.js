import React, { useEffect, useState } from "react";
import CommentContainer from "./commentContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";

function CommentFeed(postID) {
  const [comments, setComments] = useState([]);
  console.log("postID", postID.postID);
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
      .get(
        `https://www.threadit.tech/api/v1/posts/${postID.postID}/comments/
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
                user: item.user,
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
        setComments(mappedData.reverse());
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="post-feed">
      {comments.map((comment, index) => {
        console.log("comment data:", comment); // Log the comment data here
        return <CommentContainer key={index} commentData={comment} />;
      })}
    </div>
  );
}

export default CommentFeed;

CommentFeed.propTypes = {
  postData: PropTypes.array,
};
