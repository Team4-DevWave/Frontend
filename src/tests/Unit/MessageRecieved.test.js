// import React from 'react';
// import { render, act } from '@testing-library/react';
// import axios from 'axios';
// import MessageRecived from '../../components/messages/MessageRecived';

// jest.mock('axios');

// describe('MessageRecived component', () => {
//     afterEach(() => {
//         jest.clearAllMocks();
//     });



//     it('sets state with data received from the server', async () => {
//         const mockData = [
//             { from: { username: 'sender1' }, to: 'receiver1', subject: 'Test Subject 1', message: 'Test message 1', read: false },
//             { from: { username: 'sender2' }, to: 'receiver2', subject: 'Test Subject 2', message: 'Test message 2', read: true },
//         ];

//         axios.get.mockResolvedValueOnce({ data: mockData });

//         let component;
//         await act(async () => {
//             component = render(<MessageRecived />);
//         });

//         const { getByText } = component;

//         expect(getByText('From: sender1')).toBeInTheDocument();
//         expect(getByText('To: receiver1')).toBeInTheDocument();
//         expect(getByText('Subject: Test Subject 1')).toBeInTheDocument();
//         expect(getByText('Test message 1')).toBeInTheDocument();
//         expect(getByText('From: sender2')).toBeInTheDocument();
//         expect(getByText('To: receiver2')).toBeInTheDocument();
//         expect(getByText('Subject: Test Subject 2')).toBeInTheDocument();
//         expect(getByText('Test message 2')).toBeInTheDocument();
//     });

//     it('renders messages correctly', async () => {
//         const mockData = [
//             { from: { username: 'sender1' }, to: 'receiver1', subject: 'Test Subject 1', message: 'Test message 1', read: false },
//             { from: { username: 'sender2' }, to: 'receiver2', subject: 'Test Subject 2', message: 'Test message 2', read: true },
//         ];

//         axios.get.mockResolvedValueOnce({ data: mockData });

//         let component;
//         await act(async () => {
//             component = render(<MessageRecived />);
//         });

//         const { getByText } = component;

//         mockData.forEach((message) => {
//     expect(getByText(`From: ${message.from.username}`)).toBeInTheDocument();
//     expect(getByText(`To: ${message.to}`)).toBeInTheDocument();
//     expect(getByText(`Subject: ${message.subject}`)).toBeInTheDocument();
//     expect(getByText(message.message)).toBeInTheDocument();
// });
//     });
// });
import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import MessageRecived from '../../components/messages/MessageRecived';

jest.mock('axios');

const mockData = [
    { from: { username: 'sender1' }, to: 'receiver1', subject: 'Test Subject 1', message: 'Test message 1', read: false },
    { from: { username: 'sender2' }, to: 'receiver2', subject: 'Test Subject 2', message: 'Test message 2', read: true },
];

describe('MessageRecived component', () => {
    it('sets state with data received from the server', async () => {
        axios.get.mockResolvedValueOnce({ data: { data: { messages: mockData } } });

        const component = render(<MessageRecived />);

        const { findByText } = component;

        for (let message of mockData) {
            expect(await findByText(`From: ${message.from.username}`)).toBeInTheDocument();
            expect(await findByText(`To: ${message.to}`)).toBeInTheDocument();
            expect(await findByText(`Subject: ${message.subject}`)).toBeInTheDocument();
            expect(await findByText(message.message)).toBeInTheDocument();
        }
    });

    it('deletes a message when delete button is clicked', async () => {
        axios.get.mockResolvedValueOnce({ data: { data: { messages: mockData } } });
        axios.delete.mockResolvedValueOnce({ status: 200 });

        const component = render(<MessageRecived />);

        const { findByText } = component;

        // Assuming that the delete button has the text 'Delete'
        const deleteButtons = await findAllByText('Delete');
        const deleteButton = deleteButtons[0];
        deleteButton.click();

        // Wait for the component to update after the deletion
        await waitFor(() => expect(axios.delete).toHaveBeenCalledTimes(1));

        // Check that the deleted message is no longer rendered
        // Assuming that the first message in mockData is the one being deleted
        expect(await findByText(`From: ${mockData[0].from.username}`)).not.toBeInTheDocument();
    });
});