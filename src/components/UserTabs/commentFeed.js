import React, { useEffect, useState, useContext, useRef } from "react";
import CommentContainer from "./commentContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import { LiveCommentsContext } from "./Comments.js";
import CircularProgress from "@mui/material/CircularProgress";

function CommentFeed(postID) {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { liveComments } = useContext(LiveCommentsContext);
  const loader = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 1,
      rootMargin: "30px",
    });
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (loading) {
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

        setComments((prevComments) => [...prevComments, ...mappedData]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="post-feed">
      {comments.map((comment, index) => (
        <CommentContainer key={index} commentData={comment} />
      ))}

      {/* Display the live comments */}
      {/* {liveComments.map((comment, index) => (
        <CommentContainer key={index} commentData={comment} />
      ))} */}
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
      <div ref={loader} />
    </div>
  );
}

export default CommentFeed;

CommentFeed.propTypes = {
  postData: PropTypes.array,
};
