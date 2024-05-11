import react from 'react';
import Removed from './../components/Modqueue/Removed';

export default {
    title: 'Removed',
    component: Removed,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    };

export const Removed1 = (args) => (
    <>
        <Removed {...args} />
    </>

);

Removed1.args = {
    subreddits: [], // Provide mock data for subreddits
    removedPosts: [], // Provide mock data for removedPosts

}
