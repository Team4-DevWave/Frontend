import React, { useEffect, useState, useRef } from "react";
import CommentContainer from "./commentContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function UserComments() {
  const [comments, setComments] = useState([]);
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
        `http://localhost:8000/api/v1/users/${username}/comments?page=${page}
      `,
        config
      )
      .then((response) => {
        console.log("Posts data:", response.data.data.comments);

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

        if (JSON.stringify(mappedData) === JSON.stringify(lastData)) {
          setStop(true);
          return;
        }

        console.log("mappeddata", mappedData.content);
        setComments((prevComments) => [...prevComments, ...mappedData]);
        setLastData(mappedData);
      })
      .catch((error) => console.error("Error:", error));
  }, [page]);

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {
      console.log("Bottom reached, loading more comments...");
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="post-feed">
      {comments.map((comment, index) => {
        console.log("comment data:", comment); // Log the comment data here
        return <CommentContainer key={index} commentData={comment} />;
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

export default UserComments;

UserComments.propTypes = {
  postData: PropTypes.array,
};
