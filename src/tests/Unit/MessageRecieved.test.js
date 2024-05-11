import { render, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import MessageRecived from '../../components/messages/MessageRecived.js';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios', () => ({
    delete: jest.fn(),
  }));
  
describe('MessageRecived', () => {
  const mockData = [
    // Add your mock message data here
  ];

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: { data: { messages: mockData } } });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders messages', async () => {
    const { findByText } = render(
        <Router>
          <MessageRecived />
        </Router>
      );
    for (let message of mockData) {
      await waitFor(() => {
        expect(findByText(message.message)).toBeInTheDocument();
      });
    }
  });

});