import React, { useEffect, useState, useRef } from "react";
import CommentContainer from "../../components/UserTabs/commentContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";

function OtherUserComments() {
  const [comments, setComments] = useState([]);
  const { username } = useParams();
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const [loading, setLoading] = useState(false);

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
        `https://www.threadit.tech/api/v1/users/${username}/comments?page=${page}`,
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
                time: item.lastEdited ? item.lastEdited : item.createdAt,
                postID: item.post,
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
    <div className="profile-grid">
      <div id="profgrid-2">
        <div className="post-feed">
          {comments.map((comment, index) => (
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
      </div>
    </div>
  );
}

export default OtherUserComments;

OtherUserComments.propTypes = {
  postData: PropTypes.array,
};
