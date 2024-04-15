import React, { useEffect, useState, useRef } from "react";
import CommentContainer from "./commentContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import PostContainer from "../PostContainer";

function OverView() {
  const [overviewData, setOverviewData] = useState([]);
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
  const [lastData, setLastData] = useState(null);

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
        `https://www.threadit.tech/api/v1/users/${username}/overview?page=${page}
      `,
        config
      )
      .then((response) => {
        console.log("Comments data:", response.data.data.comments);
        console.log("Posts data:", response.data.data.posts);
        const mappedData = response.data.data;

        if (JSON.stringify(mappedData) === JSON.stringify(lastData)) {
          setStop(true);
          return;
        }
        const postsWithTypes = mappedData.posts
          .map((post) => {
            if (post.text_body) {
              return {
                id: post._id,
                title: post.title,
                content: post.text_body,
                time: post.postedTime,
                votes: post.votes,
                numviews: post.numViews,
                spoiler: post.spoiler,
                nsfw: post.nsfw,
                locked: post.locked,
                approved: post.approved,
                mentioned: post.mentioned,
                username: post.userID.username,
                commentsCount: post.commentsCount,
                image: post.image,
                ishide: false,
                issaved: false,
                type: "post",
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);
        const commentsWithTypes = mappedData.comments
          .map((comment) => {
            console.log("username:", comment.user.username);
            if (comment.content) {
              return {
                id: comment._id,
                user: comment.user.username,
                content: comment.content,
                time: comment.createdAt,
                post: comment.post,
                hidden: comment.hidden,
                votes: comment.votes,
                saved: comment.saved,
                collapsed: comment.collapsed,
                mentioned: comment.mentioned,
                type: "comment",
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);

        setOverviewData((prevData) => [
          ...prevData,
          ...postsWithTypes,
          ...commentsWithTypes,
        ]);
        setLastData(mappedData);
      })
      .catch((error) => console.error("Error:", error));
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      console.log("Bottom reached, loading more data...");
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="post-feed">
      {overviewData.map((data, index) => {
        console.log(" data:", data); // Log the comment data here
        console.log(" Overview Data:", overviewData); // Log the comment data here
        return (
          <React.Fragment key={index}>
            {data.type === "post" && <PostContainer postData={data} />}
            {data.type === "comment" && <CommentContainer commentData={data} />}
          </React.Fragment>
        );
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

export default OverView;

OverView.propTypes = {
  postData: PropTypes.array,
};
