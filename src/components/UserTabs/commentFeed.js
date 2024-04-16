import React, { useEffect, useState, useContext } from "react";
import CommentContainer from "./commentContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import { LiveCommentsContext } from "./Comments.js";
import CircularProgress from "@mui/material/CircularProgress";

function CommentFeed(postID) {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { liveComments } = useContext(LiveCommentsContext);

  useEffect(() => {
    if (loading || isLastPage) {
      return;
    }
    setLoading(true);
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(
        `http://localhost:8000/api/v1/posts/${postID.postID}/comments?page=${page}`,
        config
      )
      .then((response) => {
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
        console.log("page comments id:", comments[comments.length - 1]);
        console.log("page comments mapped:", mappedData[mappedData.length - 1]);
        if (
          mappedData.length === 0 ||
          (comments.length > 0 &&
            JSON.stringify(comments[comments.length - 1]) ===
              JSON.stringify(mappedData[mappedData.length - 1]))
        ) {
          setIsLastPage(true);
          console.log("page last", page);
        } else {
          setComments((prevComments) => [...prevComments, ...mappedData]);
          setPage((prevPage) => prevPage + 1);
          console.log("page num", page);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [page, isLastPage, loading]);

  return (
    <div className="post-feed">
      {comments.map((comment, index) => (
        <CommentContainer key={index} commentData={comment} />
      ))}

      {/* Display the live comments */}
      {liveComments.map((comment, index) => (
        <CommentContainer key={index} commentData={comment} />
      ))}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default CommentFeed;

CommentFeed.propTypes = {
  postData: PropTypes.array,
};
