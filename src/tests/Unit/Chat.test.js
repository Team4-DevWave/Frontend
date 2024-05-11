import { render, screen } from '@testing-library/react';
import ChatWindow from '../../components/Chat/ChatWindow.js';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import axios from 'axios';




jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({ data: { data: [] } })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
  }));



jest.mock('socket.io-client', () => {
    const emit = jest.fn();
    const on = jest.fn();
    const off = jest.fn();
    return () => ({
      emit,
      on,
      off,
    });
  });

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: '1',
  }),
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(() => 'fake_token'),
}));



describe('ChatWindow', () => {
    test('renders ChatWindow component without crashing', () => {
        render(<ChatWindow />);
    });

    test('sends message when send button is clicked', async () => {
        // Mock the axios.get function to return test data
        axios.get.mockResolvedValue({
          data: {
            data: {
              chatrooms: [
                { id: '1', chatroomName: 'Test Chat Room' },
                // Add more chat rooms if needed
              ],
            },
          },
        });
      
        render(<ChatWindow />);
        // Wait for the chat room to appear
        const chatRoomDiv = await screen.findByText('Test Chat Room');
        fireEvent.click(chatRoomDiv);
        // Wait for the Send button to appear
        const sendButton = await screen.findByTestId('sendButton');

                fireEvent.click(sendButton);
        // Check that the message was sent (this will depend on your component's implementation)
      });
});