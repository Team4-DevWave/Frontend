import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import { List, ListItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostContainer from "../../components/PostContainer";
import { Card, CardContent, CardHeader, CardMedia} from "@mui/material";
import {
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";

export default function FoundMedia(props) {
  const navigate = useNavigate();
  const [media, setmedia] = useState(props.media);

  if (!media || media.length === 0) {
    return (
      <Typography sx={{ textAlign: "center" }} variant="h6" gutterBottom>
        No Media found
      </Typography>
    );
  } else {
    return <>
    <div>
      {media.map((item) => (
        <Card key={item._id}>
          <CardHeader
            title={item.title}
            subheader={`Posted by u/${item.userID.username}`}
          />
          <CardMedia
            component="img"
            src={item.image}
            alt={item.title}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {item.text_body}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
    </>;
  }
}
