import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import All from '../../components/messages/All.js';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

global.IntersectionObserver = class IntersectionObserver {
    constructor() { }

    disconnect() { }

    observe() { }

    takeRecords() { }

    unobserve() { }
};

jest.mock('axios');

describe('All', () => {
    test('displays loading text initially', async () => {
        axios.get.mockResolvedValue({
            data: {
              data: {
                messages: [
                  {
                    id: 1,
                    text: 'Test message',
                    from: {
                      username: 'Test user',
                    },
                  },
                ]
              }
            }
          });

        render(
            <Router>
                <All />
            </Router>
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('deletes a message', async () => {
        const message = { _id: '1', from: { username: 'user1' }, to: { username: 'user2' }, subject: 'Test', message: 'Test message' };
        axios.get.mockResolvedValueOnce({ data: { data: { messages: [message] } } });
        axios.delete.mockResolvedValueOnce({});

        const { getByText, findByText } = render(
            <Router>
                <All />
            </Router>
        );

        const deleteButton = await findByText('Delete');
        fireEvent.click(deleteButton);

        expect(axios.delete).toHaveBeenCalledWith(`http://localhost:8000/api/v1/messages/${message._id}/delete`, expect.anything());
    });

    // Add more tests as needed
});