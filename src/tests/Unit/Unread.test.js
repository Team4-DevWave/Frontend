import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Unread from '../../components/messages/Unread.js';
import { BrowserRouter as Router } from 'react-router-dom';



global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
  
    disconnect() {}
  
    observe() {}
  
    takeRecords() {}
  
    unobserve() {}
  };
jest.mock('axios');

describe('Unread component', () => {
  test('marks a message as read', async () => {
    const message = { _id: '1', from: { username: 'user1' }, to: { username: 'user2' }, subject: 'Test', message: 'Test message' };
    axios.get.mockResolvedValueOnce({ data: { data: { messages: [message] } } });
    axios.patch.mockResolvedValueOnce({ data: { data: { message: { ...message, read: true } } } });

    const { getByText, findByText } = render(
        <Router>
          <Unread />
        </Router>
      );

    const markUnreadButton = await findByText('Mark Unread');
    fireEvent.click(markUnreadButton);

    expect(axios.patch).toHaveBeenCalledWith(`http://localhost:8000/api/v1/messages/${message._id}/markread`, { read: true }, expect.anything());
  });

  test('deletes a message', async () => {
    const message = { _id: '1', from: { username: 'user1' }, to: { username: 'user2' }, subject: 'Test', message: 'Test message' };
    axios.get.mockResolvedValueOnce({ data: { data: { messages: [message] } } });
    axios.delete.mockResolvedValueOnce({});
  
    const { getByText, findByText } = render(
      <Router>
        <Unread />
      </Router>
    );
  
    const deleteButton = await findByText('Delete');
    fireEvent.click(deleteButton);
  
    expect(axios.delete).toHaveBeenCalledWith(`http://localhost:8000/api/v1/messages/${message._id}/delete`, expect.anything());
  });
});