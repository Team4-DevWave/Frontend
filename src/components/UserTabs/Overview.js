import React, { useEffect, useState, useRef } from "react";
import CommentContainer from "./commentContainer";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import PostContainer from "../PostContainer";
import "./overview.css";
import UserPostContainer from "./UserPostContainer";
import UserCommentContainer from "./UserCommentContainer";

function OverView() {
  const [overviewData, setOverviewData] = useState([]);
  const username = localStorage.getItem("username");
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
        `https://www.threadit.tech/api/v1/users/${username}/overview?page=${page}`,
        config
      )
      .then((response) => {
        const mappedData = response.data.data;
        const postsWithTypes = mappedData.posts
          .map((post) => {
            if (post) {
              return {
                id: post._id,
                title: post.title,
                content: post.text_body,
                time: post.lastEditedTime
                  ? post.lastEditedTime
                  : post.postedTime,
                votes: post.votes,
                numviews: post.numViews,
                spoiler: post.spoiler,
                nsfw: post.nsfw,
                locked: post.locked,
                approved: post.approved,
                mentioned: post.mentioned,
                username: post.userID.username,
                userpic: post.userID.profilePicture,
                commentsCount: post.commentsCount,
                image: post.image,
                video: post.video,
                subredditID: post.subredditID,
                ishide: post.hidden,
                issaved: post.saved,
                userVote: post.userVote,
                Link: post.url,
                poll: post.poll,
                userPollVote: post.userPollVote,
                type: "post",
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);

        const commentsWithTypes = mappedData.comments
          .map((comment) => {
            if (comment.content) {
              return {
                id: comment._id,
                user: comment.user.username,
                content: comment.content,
                time: comment.lastEdited
                  ? comment.lastEdited
                  : comment.createdAt,
                postID: comment.post,
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

        console.log("mappedData.posts", mappedData.posts);

        // Code to populate postsWithTypes...

        console.log("postsWithTypes", postsWithTypes);

        setOverviewData((prevData) => [
          ...prevData,
          ...postsWithTypes,
          ...commentsWithTypes,
        ]);

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
    <div>
      <div>
        <div className="post-feed">
          {overviewData.map((data, index) => (
            <React.Fragment key={index}>
              {data.type === "post" && <PostContainer postData={data} />}
              {data.type === "comment" && (
                <CommentContainer commentData={data} />
              )}
            </React.Fragment>
          ))}
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
            {loading && <CircularProgress />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverView;

OverView.propTypes = {
  postData: PropTypes.array,
};
