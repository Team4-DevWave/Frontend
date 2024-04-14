import React, { Component } from 'react';
import FeedPosts from '../components/PostContainer';
import exp from 'constants';

export default {
  title: "FeedPosts",
  component: FeedPosts,
  tags: ['autodocs'],
};
const post = {
  id: 1,
  title: "Post Title",
  content: "This is a post",
}
export const FeedPosts1 = () => {
  

  return <FeedPosts key={1} postData={post} />;
};

