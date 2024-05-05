
import React, { Component } from 'react';
import { Meta } from '@storybook/react';
import SideBar from '../layouts/Sidebar';
import "../index.css";
import exp from 'constants';

export default {
  title: "SideBar",
  component: SideBar,


  tags: ['autodocs'],
 
 
};


export const SideBarComp = (args) => (
  <>
    <div style={{height:"100vh"}}>
      <SideBar />
    </div>
    
  </>
);
