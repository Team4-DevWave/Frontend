import React from 'react';
import { render, waitFor, fireEvent,within} from '@testing-library/react';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import Unmoderated from './../../components/Modqueue/Unmoderated';

jest.mock('axios');

describe('Unmoderated component', () => {
    beforeEach(() => {
        axios.get.mockImplementation((url) => {
            switch (url) {
                case 'http://localhost:4000/api/subreddits':
                    return Promise.resolve({
                        data: [{
                            id: 1,
                            name: 'r/aww'
                        },
                        {
                            id: 2,
                            name: 'r/funny'
                        },
                        {
                            id: 3,
                            name: 'r/pics'
                        }
                        ],
                    });
                case `http://localhost:4001/api/subreddits/1/removedPosts`:
                    return Promise.resolve({
                        data: [{
                            id: 1,
                            data: {
                                type: "post",
                                data: {
                                    post: {
                                        _id: "aa0c",
                                        votes: {
                                            upvotes: 1,
                                            downvotes: 0
                                        },
                                        username: "joe",
                                        title: "sjkna",
                                        content: "klasfn",
                                        bold: false,
                                        italic: false,
                                        id: "aa0c"
                                    },
                                    id: "aa0c"
                                },
                                user: {
                                    id: "a0c",
                                    name: "joe"
                                },
                                date: "2013-01-01T00:00:00Z",
                                subredditId: "2",
                                reason: "spam",
                                id: "aa0c",
                                removedstatus: true,
                                spamstatus: true,
                                removedby: "admin",
                                status: "disapproved"
                            }
                        }]
                    });
                default:
                    return Promise.reject(new Error('not found'));
            }
        });
    });

    it('renders the component', () => {
        const { getByText } = render(<Unmoderated />);
        expect(getByText('Select your Subreddit please')).toBeInTheDocument();
    });





});