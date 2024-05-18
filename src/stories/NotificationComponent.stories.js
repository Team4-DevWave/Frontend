import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Notification from '../components/Notification/Notification';

//👇 This default export determines where your story goes in the story list

export default {
    title: 'Notification',
    component: Notification,
    parameters: {
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
};


//exporting with args for the component
const Template = (args) => <Router><Notification {...args} /></Router>;
;
export const notifications = Template.bind({});
notifications.args = {
    primary: true,
    label: 'Button',
};