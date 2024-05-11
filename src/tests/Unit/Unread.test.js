import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Unread from '../../components/messages/Unread.js';

describe('Unread component', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <Unread />
      </Router>
    );
    // Add more assertions here
  });
});