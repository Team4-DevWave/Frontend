import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SendAPrivateMessage from '../../components/messages/SendAPrivateMessage.js';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

jest.mock('axios');

describe('SendAPrivateMessage', () => {
  it('renders without crashing', () => {
    render(<SendAPrivateMessage />);
  });

  it('has the necessary form fields', () => {
    render(<SendAPrivateMessage />);
    expect(screen.getByLabelText('From:')).toBeInTheDocument();
    expect(screen.getByLabelText('To:')).toBeInTheDocument();
    expect(screen.getByLabelText('Subject:')).toBeInTheDocument();
    expect(screen.getByLabelText('Message:')).toBeInTheDocument();
  });

  it('submits the form', async () => {
    axios.post.mockResolvedValue({ status: 201 });

    render(<SendAPrivateMessage initialFrom="u/test" initialTo="u/test2" initialSubject="Test" initialMessage="Test message" />);

    fireEvent.click(screen.getByText('Send Message'));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());

    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:8000/api/v1/messages/compose',
      {
        from: 'u/test',
        to: 'u/test2',
        subject: 'Test',
        message: 'Test message',
        read: false
      },
      expect.anything()
    );
  });
});