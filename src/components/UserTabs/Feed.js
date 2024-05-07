import React, { useEffect, useState, useRef } from "react";
import PostContainer from "../PostContainer";
import GuestPostContainer from "../GuestPostContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import IconButton from "@mui/material/IconButton";
import SortOptions from "../SortOptions";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const token = Cookies.get("token");
  const [sortOption, setSortOption] = React.useState("best");

  const toggleVisibility = () => {
    if (window.scrollY > 700) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

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
    setPosts([]);
  }, [sortOption]);

  useEffect(() => {
    if (loading) {
      return;
    }
    setLoading(true);

    let config = {};

    if (token) {
      config = {
        headers: { Authorization: `Bearer ${token}` },
      };
    }

    console.log("Sort option changed:", sortOption);
    axios
      .get(
        token
          ? `http://localhost:8000/api/v1/posts/${sortOption}?page=${page}`
          : `http://localhost:8000/api/v1/posts?page=${page}`,
        config
      )

      .then((response) => {
        const mappedData = response.data.data.posts
          .map((item) => {
            if (item) {
              return {
                id: item._id,
                title: item.title,
                content: item.text_body,
                time: item.lastEditedTime
                  ? item.lastEditedTime
                  : item.postedTime,
                votes: item.votes,
                numviews: item.numViews,
                spoiler: item.spoiler,
                nsfw: item.nsfw,
                locked: item.locked,
                approved: item.approved,
                mentioned: item.mentioned,
                username: item.userID.username,
                userpic: item.userID.profilePicture,
                commentsCount: item.commentsCount,
                image: item.image,
                video: item.video,
                subredditID: item.subredditID,
                ishide: item.hidden,
                issaved: item.saved,
                userVote: item.userVote,
                Link: item.url,
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
  }, [page, sortOption]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="post-feed">
      <SortOptions onSortOptionChange={setSortOption} />
      {posts.map((post, index) =>
        token ? (
          <PostContainer key={index} postData={post} />
        ) : (
          <GuestPostContainer key={index} postData={post} />
        )
      )}
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

      {isVisible && (
        <IconButton
          aria-label="fingerprint"
          color="error"
          onClick={scrollToTop}
          style={{
            position: "fixed", // Position fixed
            bottom: "20px",
            left: "300px",
          }}
        >
          <KeyboardDoubleArrowUpIcon />
        </IconButton>
      )}
    </div>
  );
}

export default Feed;

Feed.propTypes = {
  postData: PropTypes.array,
};
