import React from "react";
import PostContainer from "../PostContainer";

function PostFeed() {
  const posts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // Replace with your actual data

  return (
    <div className="post-feed">
      {posts.map((post, index) => (
        <PostContainer key={index} />
      ))}
    </div>
  );
}

export default PostFeed;
