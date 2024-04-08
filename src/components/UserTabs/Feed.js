import React, { useEffect, useState } from "react";
import PostContainer from "../PostContainer";

function PostFeed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then((response) => response.json())
      .then((data) => {
        console.log("Posts data:", data);

        const mappedData = data
          .map((item) => {
            if (item.content) {
              return {
                id: item.id,
                title: item.content.title,
                content: item.content.content,
              };
            } else {
              return null;
            }
          })
          .filter(Boolean);
        console.log("mappeddata", mappedData.content);
        setPosts(mappedData.reverse());
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="post-feed">
      {posts.map((post, index) => {
        console.log("Post data:", post); // Log the post data here
        return <PostContainer key={index} postData={post} />;
      })}
    </div>
  );
}

export default PostFeed;
