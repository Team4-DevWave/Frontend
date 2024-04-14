import React from 'react'
import { render, waitFor, screen } from '@testing-library/react';
import Notification from './Notification';

// Mock socket.io-client
jest.mock('socket.io-client', () => () => ({
    on: jest.fn(),
    disconnect: jest.fn(),
}));

describe('Notification Component', () => {
    it('renders without crashing', () => {
        render(<Notification />);
    });

    it('receives and displays notification data', async () => {
        render(<Notification />);

        const testData = {
            userName: 'Test User',
            recipientUserId: '123',
            senderUserEmail: 'sender@example.com',
            senderUserId: '456',
            type: 'comment',
            threadID: '789',
            threadData: 'Some thread data',
            timestamp: '2024-03-26T12:00:00.000Z',
        };
        const socketMock = require('socket.io-client')();
        socketMock.on.mockImplementationOnce((event, callback) => {
            if (event === 'receiveNotification') {
                callback(testData);
            }
            console.log('Socket event:', event);

        });

        const receivedData = await screen.findByText('Data received from server:');
        expect(receivedData).toBeInTheDocument();

    });
});
