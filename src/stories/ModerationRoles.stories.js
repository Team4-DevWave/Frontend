import React from 'react';
import ModerationRoles from '../components/Modqueue/ModerationRoles';

export default {
    title: 'ModerationRoles',
    component: ModerationRoles,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],

}
const template = (args) => (
    <>
        <ModerationRoles {...args} />
    </>

);

export const ModerationRoles1 = template.bind({});
ModerationRoles1.args = {
    subreddits: [], // Provide mock data for subreddits
}