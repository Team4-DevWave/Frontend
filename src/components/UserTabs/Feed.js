
import React, { useEffect, useState, useRef } from "react";
import PostContainer from "../PostContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
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
      .get(`http://localhost:8000/api/v1/posts?page=${page}`, config)
      .then((response) => {
        const mappedData = response.data.data.posts
          .map((item) => {
            if (item) {
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
                video: item.video,
                subredditID: item.subredditID,
                ishide: false,
                issaved: false,
                userVote: item.userVote,
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);

        setPosts((prevPosts) => [...prevPosts, ...mappedData]);
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
      {posts.map((post, index) => (
        <PostContainer key={index} postData={post} />
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

export default Feed;

Feed.propTypes = {
  postData: PropTypes.array,
};
