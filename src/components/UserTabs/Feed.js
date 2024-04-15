import React, { useEffect, useState, useRef } from "react";
import PostContainer from "../PostContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const [stop, setStop] = useState(false);
  const [lastData, setLastData] = useState(null);

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
      .get(`http://localhost:8000/api/v1/posts?page=${page}`, config)
      .then((response) => {
        console.log("Posts data:", response.data.data.posts);

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
                video:item.video,
                ishide: false,
                issaved: false,
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);

        if (JSON.stringify(mappedData) === JSON.stringify(lastData)) {
          setStop(true);
          return;
        }

        console.log("mappeddata", mappedData.content);
        setPosts((prevPosts) => [...prevPosts, ...mappedData]);
        setLastData(mappedData);
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
        return <PostContainer key={index} postData={post} />;
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

export default Feed;

Feed.propTypes = {
  postData: PropTypes.array,
};
