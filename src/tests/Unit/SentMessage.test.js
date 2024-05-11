import React from 'react';
import { render, act } from '@testing-library/react';
import axios from 'axios';
import Sent from '../../components/messages/Sent.js';

jest.mock('axios');
jest.mock('js-cookie', () => ({
  get: jest.fn().mockReturnValue('fakeToken'),
}));

describe('Sent', () => {
  it('fetches and displays messages', async () => {
    const messages = [
    ];

    axios.get.mockResolvedValueOnce({ data: { data: { messages } } });

    let container;
    await act(async () => {
      container = render(<Sent />);
    });

    messages.forEach((message) => {
      expect(container.getByText(message.subject)).toBeInTheDocument();
    });
  });

  it('displays a message when there are no messages', async () => {
    axios.get.mockResolvedValueOnce({ data: { data: { messages: [] } } });

    let container;
    await act(async () => {
      container = render(<Sent />);
    });

    expect(container.getByText("End of messages")).toBeInTheDocument();
  });
});