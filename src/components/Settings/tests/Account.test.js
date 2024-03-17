/* eslint-disable testing-library/prefer-find-by */
/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Account from './Account'; // Assuming this is the correct path to your component

// Mocking the API functions
jest.mock('./api', () => ({
  changeEmail: jest.fn(() => Promise.resolve({ success: true })),
  changeGender: jest.fn(() => Promise.resolve({ success: true })),
  changeLanguage: jest.fn(() => Promise.resolve({ success: true })),
  changeLocation: jest.fn(() => Promise.resolve({ success: true })),
}));

describe('Account Component', () => {
  test('Changing email', async () => {
    const { getByText, getByLabelText } = render(<Account />);

    // Open the email dialog
    fireEvent.click(getByText('Change'));

    // Enter new email
    const newEmailInput = getByLabelText('New Email Address');
    fireEvent.change(newEmailInput, { target: { value: 'newemail@example.com' } });

    // Click on Change button in the dialog
    fireEvent.click(getByText('Change'));

    // Wait for the snackbar to appear
    await waitFor(() => expect(getByText('Email changed successfully!')).toBeInTheDocument());
  });

  test('Changing gender', async () => {
    const { getByText } = render(<Account />);

    // Click on the gender select
    fireEvent.click(getByText('Man'));

    // Click on Woman
    fireEvent.click(getByText('Woman'));

    // Wait for the success message
    await waitFor(() => expect(getByText('Gender changed successfully!')).toBeInTheDocument());
  });

  test('Changing language', async () => {
    const { getByText } = render(<Account />);

    // Click on the language select
    fireEvent.click(getByText('English (US)'));

    // Click on another language
    fireEvent.click(getByText('French'));

    // Wait for the success message
    await waitFor(() => expect(getByText('Language changed successfully!')).toBeInTheDocument());
  });

  test('Changing location', async () => {
    const { getByText } = render(<Account />);

    // Click on the location select
    fireEvent.click(getByText('Use approximate location (based on IP)'));

    // Click on a different location
    fireEvent.click(getByText('Afghanistan'));

    // Wait for the success message
    await waitFor(() => expect(getByText('Location changed successfully!')).toBeInTheDocument());
  });
});
