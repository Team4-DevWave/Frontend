import React from 'react';
import PostContainer from '../components/PostContainer';

export default {
  title: "PostContainer",
  component: PostContainer,
  tags: ['autodocs'],
};
const post = {
  id: 1,
  title: "Post Title",
  content: "This is a post",
}
export const PostContainer1 = () => {
  

  return <PostContainer key={1} postData={post} />;
};

