import react from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Unmoderated from '../components/Modqueue/Unmoderated';

//👇 This default export determines where your story goes in the story list

export default {
    title: 'Unmoderated',
    component: Unmoderated,
    parameters: {
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
};


//👇 We create a "template" of how args map to rendering
const Template = (args) => <Router><Unmoderated {...args} /></Router>;
;
export const unmoderated = Template.bind({});


unmoderated.args = {
    subreddits: [], // Provide mock data for subreddits
    removedPosts: [], // Provide mock data for removedPosts
    approvedPosts: [], // Provide mock data for approvedPosts
    handleApprove: () => {}, // Provide a mock function for handleApprove
    handleDisapprove: () => {}, // Provide a mock function for handleDisapprove
};
