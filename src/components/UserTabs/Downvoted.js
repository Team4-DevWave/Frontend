import React, { useEffect, useState, useRef } from "react";
import PostContainer from "../PostContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import UserPostContainer from "./UserPostContainer";

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
        `https://www.threadit.tech/api/v1/users/me/downvoted?page=${page}`,
        config
      )
      .then((response) => {
        console.log("Posts data:", response.data.data.posts);
        console.log("Responses:", response);
        const mappedData = response.data.data.posts
          .map((item) => {
            console.log("items:", item.text_body);
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
                poll: item.poll,
                userPollVote: item.userPollVote,
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);

        const lastDataIds = lastData.current
          ? lastData.current.map((post) => post._id)
          : [];
        const mappedDataIds = mappedData.map((post) => post._id);

        if (JSON.stringify(lastDataIds) === JSON.stringify(mappedDataIds)) {
          setStop(true);
          return;
        }

        console.log("mappeddata", mappedData.content);
        setPosts((prevPosts) => [...prevPosts, ...mappedData]);
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

export default Downvoted;

Downvoted.propTypes = {
  postData: PropTypes.array,
};
