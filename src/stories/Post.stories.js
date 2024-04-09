import React, { Component } from 'react';
import { Meta } from '@storybook/react';
import Post from '../components/Create_Post/Post';
import exp from 'constants';

export default {
  title: "Post",
  component: Post,


  tags: ['autodocs'],
 
 
};


export const Post2 = (args) => (
  <>
    
    <Post />
  </>
);