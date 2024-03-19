import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import NorthIcon from '@mui/icons-material/North';

function Posts(props) {
  const posts = props.posts;
  return (
    <div>
      {posts.map((post) => (
        <Card sx={{marginBottom: 2}}>
          <CardContent>
            <Typography variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography variant="body1">{post.content}</Typography>
          </CardContent>
          <CardActions>
            <Button startIcon size="small"><NorthIcon/>Upvote</Button>
            <Button size="small">Comment</Button>
            <Button size="small">Share</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
export default Posts;
