import react from 'react';
import CommunityRules from '../components/Modqueue/CommunityRules';

export default {
    title: 'CommunityRules',
    component: CommunityRules,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    };

const Template = (args) => (
    <>
        <CommunityRules {...args} />
    </>

);

export const CommunityRules1 = Template.bind({});
CommunityRules1.args = {
    subreddits: [], // Provide mock data for subreddits
    communityRules: [], // Provide mock data for communityRules

}

