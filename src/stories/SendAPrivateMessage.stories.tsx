import React, { Component } from 'react';
import { Meta } from '@storybook/react';
import SendAPrivateMessage from '../components/messages/SendAPrivateMessage';
import exp from 'constants';


// // This tells Storybook about the component and provides some metadata
// export default {
//   title: 'SendAPrivateMessage',
//   component: SendAPrivateMessage,
//   parameters: {
//     docs: {
//       description: {
//         component: 'A component for sending a private message.',
//       },
//     },
//   },
// } as Meta;

// // Define the story for the SendAPrivateMessage component
// export const Default = () => (
//   <SendAPrivateMessage />
// );


// export const primary = (args) => <SendAPrivateMessage {...args} />;
// primary.args = {
//   primary: true,
//   label: 'Button',
// };



export default {
  title: '../components/messages/SendAPrivateMessage',
  component: SendAPrivateMessage,
  parameters: {
    docs: {
      description: {
        component: `
          The SendAPrivateMessageComponent is a component that displays a received message.

          ## Usage

          Import the component.

          \`\`\`jsx
          import MessageRecivedComponent from './MessageRecivedComponent';
          \`\`\`

          Then use it in your app.

          \`\`\`jsx
          <MessageRecivedComponent />
          \`\`\`

          ## Functionality

          Describe the functionality of the MessageRecivedComponent here.
        `,
      },
    },
  },
} as Meta;

export const Default = () => <SendAPrivateMessage />;