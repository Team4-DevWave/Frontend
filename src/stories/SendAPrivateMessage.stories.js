
import React, { Component } from 'react';
import { Meta } from '@storybook/react';
import SendAPrivateMessage from '../components/messages/SendAPrivateMessage';
import exp from 'constants';

export default {
  title: "SendAPrivateMessage",
  component: SendAPrivateMessage,


  tags: ['autodocs'],
 
 
};


export const SendAPrivateMessage1 = (args) => (
  <>
    
    <SendAPrivateMessage />
  </>
);

