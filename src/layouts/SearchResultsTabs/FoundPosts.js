import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostContainer from "../../components/PostContainer";
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";



export default function FoundPosts(props) {
  const navigate = useNavigate();
  const [postData, setPostData] = useState(props.postData);
  useEffect(() => {
    console.log("postData", postData);
    const filteredPostData= postData
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
        video: item.video,
        subredditID: item.subredditID,
        ishide: false,
        issaved: false,
      };
    } else {
      return null;
    }
  })
  .filter(Boolean);
    setPostData(filteredPostData);
  }, []);

  if (!postData || postData.length === 0) {
    return (
      <Typography sx={{ textAlign: "center" }} variant="h6" gutterBottom>
        No Posts found
      </Typography>
    );
  } else {
    return (
      <>
        {postData.map((post,i) => (
          <PostContainer key={i} postData={post} />
        ))}
      </>
    );
  }
}
