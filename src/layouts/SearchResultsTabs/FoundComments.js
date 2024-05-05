import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostContainer from "../../components/PostContainer";
import CommentContainer from "../../components/UserTabs/commentContainer";
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";

export default function FoundComments(props) {
  const navigate = useNavigate();
  const [commentData, setCommentData] = useState([]);
  console.log("commentData from outside", commentData);
  useEffect(() => {
    console.log("commentData from inside", commentData);
    const filteredcommentData = props.commentData

      .map((item) => {
        if (item) {
            console.log("item", item);
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

    setCommentData((prevComments) => [...prevComments, ...filteredcommentData]);
    console.log("commentData", commentData);
  }, []);

  if (!commentData || commentData.length === 0) {
    return (
      <Typography sx={{ textAlign: "center" }} variant="h6" gutterBottom>
        No Comments found
      </Typography>
    );
  } else {
    return (
      <>
        <div className="post-feed">
          {commentData.map((comment, i) => (
            <CommentContainer key={i} commentData={comment} />
          ))}
        </div>
      </>
    );
  }
}
