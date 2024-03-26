import React from 'react';
import { render, act } from '@testing-library/react';
import io from 'socket.io-client';
import Notification from '../../components/Notification/Notification';

// Mock the socket.io-client library
jest.mock('socket.io-client');

describe('Notification component', () => {
    let mockSocket;

    beforeEach(() => {
        // Mock the socket instance
        mockSocket = {
            on: jest.fn(),
            disconnect: jest.fn(),
        };
        io.mockReturnValue(mockSocket);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<Notification />);
    });

    it('sets up socket connection on mount', () => {
        render(<Notification />);
        expect(io).toHaveBeenCalledWith('http://localhost:4000');
        expect(mockSocket.on).toHaveBeenCalledWith('receiveNotification', expect.any(Function));
    });

    it('handles incoming data from socket', async () => {
        const { getByText } = render(<Notification />);
        const sampleData = {
            type: 'comment',
            userName: 'John Doe',
            recipientUserId: '123',
            senderUserEmail: 'sender@example.com',
            senderUserId: '456',
            threadID: '789',
            threadData: 'Sample thread data',
            timestamp: new Date().toISOString(),
        };

        // Trigger the receiveNotification event
        act(() => {
            mockSocket.on.mock.calls[0][1](sampleData);
        });

        // Check if the received data is rendered
        expect(getByText('UserName: John Doe')).toBeInTheDocument();
        expect(getByText('RecipientUserID: 123')).toBeInTheDocument();
        expect(getByText('SenderUserEmail: sender@example.com')).toBeInTheDocument();
        expect(getByText('SenderUserID: 456')).toBeInTheDocument();
        expect(getByText('Type: comment')).toBeInTheDocument();
        expect(getByText('ThreadID: 789')).toBeInTheDocument();
        expect(getByText('ThreadData: Sample thread data')).toBeInTheDocument();

      //  expect(getByText('Timestamp:')).toBeInTheDocument(); // You may need to adjust this based on the actual timestamp format
    });

    //check if image is renedered coreectly
    it('renders correct image based on notification type', () => {
        const { getByAltText } = render(<Notification />);
        const sampleData = {
            type: 'comment',
        };

        act(() => {
            mockSocket.on.mock.calls[0][1](sampleData);
        });

        expect(getByAltText('comment')).toBeInTheDocument();
    });




});
