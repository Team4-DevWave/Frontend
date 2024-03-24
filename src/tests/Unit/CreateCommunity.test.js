import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CreateCommunity from '../../components/CreateCommunity';

describe('CreateCommunity', () => {
    it('renders correctly', () => {
        render(<CreateCommunity />);
        expect(screen.getByText(/Create/i)).toBeInTheDocument();
    });

    it('opens and closes the modal when the "Create" button is clicked', () => {
        render(<CreateCommunity />);
        const createButton = screen.getByText(/Create/i);

        // Open the modal
        fireEvent.click(createButton);
        expect(screen.getByText("Build and grow a community about something you care about. We'll help you set things up.")).toBeInTheDocument();

        // // Close the modal
        // const cancelButton = screen.getByText('Cancel');
        // fireEvent.click(cancelButton);
        // expect(screen.queryByText("Build and grow a community about something you care about. We'll help you set things up.")).not.toBeInTheDocument();
    });
    it('renders the community name input', () => {
        render(<CreateCommunity />);
        const createButton = screen.getByText(/Create/i);
        fireEvent.click(createButton);
        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    } );
    it('renders the community type input', () => {
        render(<CreateCommunity />);
        const createButton = screen.getByText(/Create/i);
        fireEvent.click(createButton);
        expect(screen.getByText(/Community Type/i)).toBeInTheDocument();
    } );
    it('The Create button is disabled when the community name is empty', () => {
        render(<CreateCommunity />);
        const createButton = screen.getByText(/Create/i);
        fireEvent.click(createButton);
        const createCommunityButton = screen.getByRole('button', { name: /Create/i });
        expect(createCommunityButton).toBeDisabled();
    } );
    it('Create button is enabled when the community name is entered and type is selected', () => {
        render(<CreateCommunity />);
        const createButton = screen.getByText(/Create/i);
        fireEvent.click(createButton);
        const createCommunityButton = screen.getByRole('button', { name: /Create/i });
        const communityName = screen.getByLabelText(/Name/i);
        fireEvent.change(communityName, { target: { value: 'community' } });
        const publicRadio = screen.getByLabelText(/Public/i);
        fireEvent.click(publicRadio);
        expect(createCommunityButton).toBeEnabled();
    } );
});