import React, { useEffect, useState, useContext, useRef } from "react";
import CommentContainer from "./commentContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import { LiveCommentsContext } from "./Comments.js";
import CircularProgress from "@mui/material/CircularProgress";

function CommentFeed(postID, postTitle) {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { liveComments } = useContext(LiveCommentsContext);
  const loader = useRef(null);
  const token = Cookies.get("token");
  const [hasMore, setHasMore] = useState(true);
  console.log("post title", postID);
  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });
    if (loader.current) {
      observer.observe(loader.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (loading || !hasMore) {
      console.log("comments data Loading");
      return;
    }
    setLoading(true);

    let config = {};

    if (token) {
      config = {
        headers: { Authorization: `Bearer ${token}` },
      };
    }

    axios
      .get(
        `http://localhost:8000/api/v1/posts/${postID.postID}/comments?page=${page}`,
        config
      )
      .then((response) => {
        console.log("Comments data:", response.data.data.comments);
        const mappedData = response.data.data.comments
          .map((item) => {
            if (item.content) {
              return {
                id: item._id,
                user: item.user.username,
                content: item.content,
                time: item.lastEdited ? item.lastEdited : item.createdAt,
                post: item.post,
                hidden: item.hidden,
                votes: item.votes,
                saved: item.saved,
                collapsed: item.collapsed,
                mentioned: item.mentioned,
                userVote: item.userVote,
                postID: postID.postID,
                postTitle: postID.postTitle,
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);

        setComments((prevComments) => [...prevComments, ...mappedData]);
        setLoading(false);

        if (response.data.data.comments.length === 0) {
          setHasMore(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [page, loading]);

  const [filteredComments, setFilteredComments] = useState([]);
  useEffect(() => {
    const mappedData = liveComments
      .map((item) => {
        if (item.content) {
          return {
            id: item._id,
            user: item.user,
            content: item.content,
            time: item.lastEdited ? item.lastEdited : item.createdAt,
            post: item.post,
            hidden: item.hidden,
            votes: item.votes,
            saved: item.saved,
            collapsed: item.collapsed,
            mentioned: item.mentioned,
            userVote: item.userVote,
          };
        } else {
          return null;
        }
      })
      .filter(Boolean);
    setFilteredComments(mappedData);
  }, [liveComments]);

  useEffect(() => {
    console.log("Comments data page:", page);
    console.log("livecomments", filteredComments.user);
  }, [page, filteredComments]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="post-feed">
      {comments.map((comment, index) => (
        <CommentContainer key={index} commentData={comment} />
      ))}

      {/* Display the live comments */}
      {filteredComments.map((comment, index) => (
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
      <div ref={loader} />
    </div>
  );
}

export default CommentFeed;

CommentFeed.propTypes = {
  postData: PropTypes.array,
};
