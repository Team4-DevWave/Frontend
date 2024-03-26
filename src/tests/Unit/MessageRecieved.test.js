import React from 'react';
import { render, act } from '@testing-library/react';
import axios from 'axios';
import MessageRecived from '../../components/messages/MessageRecived';

jest.mock('axios');

describe('MessageRecived component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });



    it('sets state with data received from the server', async () => {
        const mockData = [
            { from: 'sender1', to: 'receiver1', subject: 'Test Subject 1', message: 'Test message 1', read: false },
            { from: 'sender2', to: 'receiver2', subject: 'Test Subject 2', message: 'Test message 2', read: true },
        ];

        axios.get.mockResolvedValueOnce({ data: mockData });

        let component;
        await act(async () => {
            component = render(<MessageRecived />);
        });

        const { getByText } = component;

        expect(getByText('From: sender1')).toBeInTheDocument();
        expect(getByText('To: receiver1')).toBeInTheDocument();
        expect(getByText('Subject: Test Subject 1')).toBeInTheDocument();
        expect(getByText('Test message 1')).toBeInTheDocument();
        expect(getByText('From: sender2')).toBeInTheDocument();
        expect(getByText('To: receiver2')).toBeInTheDocument();
        expect(getByText('Subject: Test Subject 2')).toBeInTheDocument();
        expect(getByText('Test message 2')).toBeInTheDocument();
    });

    it('renders messages correctly', async () => {
        const mockData = [
            { from: 'sender1', to: 'receiver1', subject: 'Test Subject 1', message: 'Test message 1', read: false },
            { from: 'sender2', to: 'receiver2', subject: 'Test Subject 2', message: 'Test message 2', read: true },
        ];

        axios.get.mockResolvedValueOnce({ data: mockData });

        let component;
        await act(async () => {
            component = render(<MessageRecived />);
        });

        const { getByText } = component;

        mockData.forEach((message) => {
            expect(getByText(`From: ${message.from}`)).toBeInTheDocument();
            expect(getByText(`To: ${message.to}`)).toBeInTheDocument();
            expect(getByText(`Subject: ${message.subject}`)).toBeInTheDocument();
            expect(getByText(message.message)).toBeInTheDocument();
        });
    });
});
