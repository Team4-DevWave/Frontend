import react from 'react';
import Edited from '../components/Modqueue/Edited';

export default {
  title: 'Edited',
  component: Edited,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};


const Template = (args) => (
  <>
    <Edited {...args} />
  </>

);

export const Edited1 = Template.bind({});
Edited1.args = {
  subreddits: [], // Provide mock data for subreddits
  editedPosts: [], // Provide mock data for editedPosts

}
