import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import OldNotification from '../components/Notification/oldnotifications';

//👇 This default export determines where your story goes in the story list

export default {
    title: 'OldNotification',
    component: OldNotification,
    parameters: {
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
};


//exporting with args for the component
const Template = (args) => <Router><OldNotification {...args} /></Router>;
;
export const oldnotifications = Template.bind({});
oldnotifications.args = {
    primary: true,
    label: 'Button',
};