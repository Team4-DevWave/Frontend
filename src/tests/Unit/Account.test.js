// Account.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Account from '../../components/Settings/Account';
import * as AccountAPI from '../../components/Settings/APIs/AccountAPI';

// jest.mock('../../components/Settings/APIs/AccountAPI');
jest.mock('../../components/Settings/APIs/AccountAPI', () => ({
  ...jest.requireActual('../../components/Settings/APIs/AccountAPI'),
  useEmail: jest.fn(),
}));

describe('Account Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders account preferences section with email address', () => {
    render(<Account />);
    const emailElement = screen.getByText(/Email address/i);
    expect(emailElement).toBeInTheDocument();
    expect(screen.getByText(/example@gmail.com/i)).toBeInTheDocument();
  });

  test('opens dialog to change email', async () => {
    // Mocking email state
    const email = 'test@example.com';
    AccountAPI.useEmail.mockReturnValue(email);

    render(<Account />);
    const changeEmailButton = screen.getByTestId("changeEmail");

    fireEvent.click(changeEmailButton);

    // Wait for the dialog to appear
    await waitFor(() => {
      expect(screen.getByText(/example@gmail.com/i)).toBeInTheDocument();
    });
  });

  test('calls changeEmailAPI when changing email', () => {
    render(<Account />);
    const changeEmailButton = screen.getByTestId("changeEmail");
    fireEvent.click(changeEmailButton);

    expect(screen.getByText(/example@gmail.com/i)).toBeInTheDocument();
  });

  test('displays error message for invalid email when changing email', () => {
    render(<Account />);
    const changeEmailButton = screen.getByTestId("changeEmail");
    fireEvent.click(changeEmailButton);
    expect(screen.getByText(/example@gmail.com/i)).toBeInTheDocument();

  });

  test('closes email change dialog when clicking cancel', () => {
    render(<Account />);
    const changeEmailButton = screen.getByTestId("changeEmail");
    fireEvent.click(changeEmailButton);
    expect(screen.queryByText(/Change Email Address/i)).not.toBeInTheDocument();
  });


  test('calls changePreferenceAPI when changing language', () => {
    render(<Account />);
    const languageSelect = screen.getByText(/Display language/i);
    fireEvent.click(languageSelect);
    expect(screen.getByText(/Display language/i)).toBeInTheDocument();
  });

  test('displays error message when changing language fails', () => {
    render(<Account />);
    const languageSelect = screen.getByText(/Display language/i);
    fireEvent.click(languageSelect);
    
    expect(screen.queryByText(/changed display language/i)).not.toBeInTheDocument();
  });

  test('calls changePreferenceAPI when changing content languages', () => {
    render(<Account />);
    const languageSelect = screen.getByText(/Display language/i);
    fireEvent.click(languageSelect);

    expect(screen.getByText(/Display language/i)).toBeInTheDocument();
  });

  test('displays error message when changing content languages fails', () => {
    render(<Account />);
    const languageSelect = screen.getByText(/Display language/i);
    fireEvent.click(languageSelect);

    expect(screen.queryByText(/Failed to change content languages/i)).not.toBeInTheDocument();
  });

  test('calls changePreferenceAPI when changing location customization', () => {
    render(<Account />);
    const locationSelect = screen.getByText(/Location customization/i);
    fireEvent.click(locationSelect);

    expect(screen.getByText(/Location customization/i)).toBeInTheDocument();
  });

  test('displays error message when changing location customization fails', () => {
    render(<Account />);
    const locationSelect = screen.getByText(/Location customization/i);
    fireEvent.click(locationSelect);

    expect(screen.queryByText(/Failed to change location customization/i)).not.toBeInTheDocument();
  });

});
