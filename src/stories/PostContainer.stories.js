import React from "react";
import PostContainer from "../components/PostContainer";
import { BrowserRouter as Router } from "react-router-dom";
import "../components/PostContainer.css";
export default {
  title: "PostContainer",
  component: PostContainer,
  tags: ["autodocs"],
};
const post = {
  id: 1,
  title: "Post Title",
  content: "This is a post",
  time: "2021-10-10T14:48:00.000Z",
  votes: { upvotes: 0, downvotes: 0 },
};
export const PostContainer1 = () => {
  return (
    <Router>
      <PostContainer key={1} postData={post} />
    </Router>
  );
};
