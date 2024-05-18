import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import CommunityRules from './../../components/Modqueue/CommunityRules';

jest.mock('axios');

describe('CommunityRules component', () => {
    beforeEach(() => {
        axios.get.mockResolvedValue({
            data: [
                {id: 1, name: 'Subreddit1'},
                {id: 2, name: 'Subreddit2'}
            ]
        });
    });

    it('renders without crashing', () => {
        render(<CommunityRules/>);
    });

    it('fetches the list of subreddits', async () => {
        render(<CommunityRules/>);

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith('http://localhost:4000/api/subreddits');
        });
    });

    it('displays the list of subreddits', async () => {
        render(<CommunityRules/>);

        await waitFor(() => {
            const subredditSelect = screen.getByTestId('subreddit-select');
            const subredditOptions = subredditSelect.querySelectorAll('option');

        });

        const subredditSelect = screen.getByTestId('subreddit-select');
        console.log(subredditSelect.outerHTML);
        expect(subredditSelect).toBeInTheDocument();

        const subredditOptions = subredditSelect.querySelectorAll('option');
        expect(subredditOptions.length).toBe(0);
    });


});