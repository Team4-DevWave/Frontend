import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./SubredditRules.css";
import { Avatar, ListItemAvatar, ListItemText } from "@mui/material";
import { use } from "marked";
import { useNavigate } from "react-router-dom";
import { List, ListItem } from "@mui/material";
import { Typography, CardMedia } from "@mui/material";
import { BsExclamationDiamondFill } from "react-icons/bs";
export default function RecentPosts(props) {
  useEffect(() => {
    console.log(props.isSticky);
  }, [props.isSticky]);

  const navigate = useNavigate();
  return (
    <div
      className={props.isSticky ? "subreddit-rules sticky" : "subreddit-rules"}
    >
      <h3>RECENT POSTS</h3>
      <hr />

      <div className="subreddit-mods">
        <List>
          {props.posts.map((post, index) => (
            <ListItem
              key={index}
              onClick={() => navigate(`/comments/${post.id}/${post.title}`)}
              style={{
                cursor: "pointer",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={
                    post.userpic ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpOcB5CtpnCFAaxz3wh59gJGAlw3j_U4dNGbyCkt-izA&s"
                  }
                  sx={{ width: 35, height: 35 }}
                />
              </ListItemAvatar>
              <div>
                <ListItemText>{post.title}</ListItemText>
                {post.subredditID && (
                  <Typography variant="body2" component="div">
                    r/{post.subredditID.name}
                  </Typography>
                )}
                <Typography variant="body2" component="div">
                  upvotes: {post.votes}
                </Typography>
                <Typography variant="body2" component="div">
                  comments: {post.commentsCount}
                </Typography>
              </div>
              {post.image && post.spoiler && (
                <ListItemAvatar>
                  <div style={{ position: "relative", width: 70, height: 70 }}>
                    <CardMedia
                      component="img"
                      image={post.image}
                      sx={{
                        width: 70,
                        height: 70,
                        borderRadius: "10px",
                        filter: "blur(2px)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: -3,
                        left: -3,
                        width: "108%",
                        height: "108%",
                        backgroundColor: "rgba(33, 33, 33, 0.91)",
                        borderRadius: "10px",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.target.style.display = "none";
                      }}
                    >
                      <BsExclamationDiamondFill
                        style={{ color: "currentColor" }}
                      />
                    </div>
                  </div>
                </ListItemAvatar>
              )}
              {post.image && !post.spoiler && (
                <ListItemAvatar>
                  <CardMedia
                    component="img"
                    image={post.image}
                    sx={{ width: 70, height: 70, borderRadius: "10px" }}
                  />
                </ListItemAvatar>
              )}
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}

RecentPosts.propTypes = {
  /** Modifies CSS class where the sidebar becomes sticky after scrolling 80px */
  isSticky: PropTypes.bool,
  /** Array of rules for the subreddit */
  rules: PropTypes.array,
  /** Description of the subreddit */
  description: PropTypes.string,
  /** Number of members in the subreddit */
  members: PropTypes.number,
  /** Number of members currently online */
  online: PropTypes.number,
  /** Rank of the subreddit by size */
  rank: PropTypes.string,
  /** Array of moderators */
  moderators: PropTypes.array,
};
