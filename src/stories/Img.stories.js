import React, { Component } from 'react';
import { Meta } from '@storybook/react';
import Img from '../components/Create_Post/Img';
import exp from 'constants';

export default {
  title: "Post",
  component: Img,


  tags: ['autodocs'],
 
 
};


export const Img2 = (args) => (
  <>
    
    <Img />
  </>
);