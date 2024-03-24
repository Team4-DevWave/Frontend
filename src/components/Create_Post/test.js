// test.js

import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CreatePost from '../CreatePost'; // Path to your component file

// Example test cases
test('renders title input field', () => {
  const { getByLabelText } = render(<CreatePost />);
  const titleInput = getByLabelText('Title');
  expect(titleInput).toBeInTheDocument();
});

test('typing in title input field updates state', () => {
  const { getByLabelText } = render(<CreatePost />);
  const titleInput = getByLabelText('Title');
  fireEvent.change(titleInput, { target: { value: 'Test Title' } });
  expect(titleInput.value).toBe('Test Title');
});

test('clicking save draft button saves a draft', () => {
  const { getByText, getByLabelText, queryByText } = render(<CreatePost />);
  const titleInput = getByLabelText('Title');
  const contentInput = getByLabelText('Text');
  const saveDraftButton = getByText('Save Draft');

  fireEvent.change(titleInput, { target: { value: 'Draft Title' } });
  fireEvent.change(contentInput, { target: { value: 'Draft Content' } });
  fireEvent.click(saveDraftButton);

  const draftTitle = queryByText('Draft Title');
  const draftContent = queryByText('Draft Content');

  expect(draftTitle).toBeInTheDocument();
  expect(draftContent).toBeInTheDocument();
});

// Add more test cases as needed
