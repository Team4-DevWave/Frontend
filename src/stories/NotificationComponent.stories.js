import React from 'react';
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
const Template = (args) => <Notification {...args} />;
export const Primary = Template.bind({});
Primary.args = {
    primary: true,
    label: 'Button',
};