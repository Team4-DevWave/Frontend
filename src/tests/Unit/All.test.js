import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import All from '../../components/messages/All.js';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

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

  // Add more tests as needed
});