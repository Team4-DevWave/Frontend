import React, { useEffect, useState, useRef } from "react";
import CommentContainer from "./commentContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function Downvoted() {
  const [posts, setPosts] = useState([]);
  var title;
  var content;
  const username = localStorage.getItem("username");
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const [stop, setStop] = useState(false);

  useEffect(() => {
    if (stop) {
      return;
    }
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);
  const lastData = useRef(null);

  useEffect(() => {
    if (stop) {
      return;
    }
    const token = Cookies.get("token");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    console.log("Token:", token);
    console.log(`Fetching page ${page}...`);

    axios
      .get(
        `http://localhost:8000/api/v1/users/me/downvoted?page=${page}`,
        config
      )
      .then((response) => {
        console.log("Posts data:", response.data.data.comments);
        const postPromises = response.data.data.comments.map((item) =>
          axios.get(`http://localhost:8000/api/v1/comments/${item}`, config)
        );

        return Promise.all(postPromises);
      })
      .then((responses) => {
        const mappedData = responses
          .map((response) => {
            const item = response.data.data.comment;
            console.log("item", responses);
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

        if (JSON.stringify(mappedData) === JSON.stringify(lastData.current)) {
          setStop(true);
          return;
        }

        console.log("mappeddata", mappedData.content);
        setPosts((prevComments) => [...prevComments, ...mappedData]);
        lastData.current = mappedData;
      })
      .catch((error) => console.error("Error:", error));
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      console.log("Bottom reached, loading more posts...");
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="post-feed">
      {posts.map((post, index) => {
        console.log("post data:", post); // Log the post data here
        return <CommentContainer key={index} commentData={post} />;
      })}
      <div
        ref={loader}
        style={{
          height: "50px",
          margin: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {!stop && <CircularProgress />}
      </div>
    </div>
  );
}

export default Downvoted;

Downvoted.propTypes = {
  postData: PropTypes.array,
};
