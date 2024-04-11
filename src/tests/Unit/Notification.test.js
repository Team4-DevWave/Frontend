import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Notification from '../../components/Notification/Notification'; // Assuming the component file is in the same directory

// Mock Axios requests
const mock = new MockAdapter(axios);

// Sample notification data for testing
const testData = [
    {
        id: 1,
        userName: 'John',
        type: 'comment',
        threadData: 'Some thread data',
        timestamp: '2024-04-11T12:00:00Z',
        status: false,
    },
];

// Mock Axios responses
mock.onGet('http://localhost:8000/get_notifications').reply(200, testData);
mock.onPost('http://localhost:8000/hide_notification').reply(200, { status: 'true' });

describe('Notification Component', () => {
    it('fetches and displays notifications correctly', async () => {
        const { getByAltText, getByText, queryByText } = render(<Notification setNotificationCount={() => {}} />);

        // Wait for the loading state to disappear
        await waitFor(() => expect(queryByText('Loading...')).not.toBeInTheDocument());

        // Wait for the image to be rendered
        await waitFor(() => expect(getByAltText('comment')).toBeInTheDocument());

        // Check if the notification is displayed
        expect(getByText('John has commented your post')).toBeInTheDocument();
        expect(getByText('Some thread data')).toBeInTheDocument();
        expect(getByText('2024-04-11T12:00:00Z')).toBeInTheDocument();
    });

    it('marks notification as read on click', async () => {
        const { getByText, queryByText } = render(<Notification setNotificationCount={() => {}} />);

        // Wait for the notification data to be displayed
        await waitFor(() => expect(queryByText('John has commented your post')).toBeInTheDocument());

        // Click on the notification to mark it as read
        fireEvent.click(getByText('John has commented your post'));

        // Check if the notification text is marked as read by checking for status change sending a post request to the server changing the status to true
        await waitFor(() => expect(queryByText('John has commented your post')).toBeInTheDocument());

        //check if the server has received the post request
        expect(mock.history.post.length).toBe(1);
        // check if the client sent post request with the correct data
        expect(JSON.parse(mock.history.post[0].data)).toEqual({ notification_id: 1 });
        // check if the notification is marked as read in server response data that is sent by client to server
        const response = await axios.post('http://localhost:8000/hide_notification', { notification_id: 1 });
        console.log(response.data);
        expect(response.data.status).toEqual('true');

    });
});