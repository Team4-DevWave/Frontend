import react from 'react';
import CommunitySettings from '../components/Modqueue/CommunitySettings';

export default {
  title: 'CommunitySettings',
  component: CommunitySettings,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    
};
const template = (args) => (
    <>
        <CommunitySettings {...args} />
    </>

);

export const CommunitySettings1 = template.bind({});
CommunitySettings1.args = {
    subreddits: [], // Provide mock data for subreddits
    communitySettings: [], // Provide mock data for communitySettings

}
