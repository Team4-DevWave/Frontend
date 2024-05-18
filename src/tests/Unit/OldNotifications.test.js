import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import OldNotification from './../../components/Notification/oldnotifications';
import {BrowserRouter as Router} from 'react-router-dom';
import {waitFor} from '@testing-library/dom';
jest.mock('axios');

describe('Notification Component', () => {
    it('should render a comment notification', async () => {
        axios.get.mockResolvedValue({
            data: {
                data: {
                    notifications: [
                        {
                            type: 'comment',
                            contentID: {
                                userID: {
                                    username: 'Test User',
                                    profilePicture: 'Test Picture',
                                },
                                id: '1',
                                title: 'Test Comment',
                            },
                            content: 'This is a test comment.',
                            createdAt: '2022-01-01T00:00:00.000Z',
                            read : true,
                        },
                    ],
                },
            },
        });
        const setNotificationCount = jest.fn();

        render(            <Router>
            <OldNotification setNotificationCount={setNotificationCount} />
        </Router>);

        await waitFor(() => {
            const commentNotification = screen.getByText('Comment Notification');
            expect(commentNotification).toBeInTheDocument();
            expect(screen.getByText('Test Comment')).toBeInTheDocument();
        });

    });

    it('should render a message notification', async() => {
        axios.get.mockResolvedValue({
            data: {
                data: {
                    notifications: [
                        {
                            type: 'message',
                            contentID: {
                                userID: {
                                    username: 'Test User',
                                    profilePicture: 'Test Picture',
                                },
                                id: '1',
                                title: 'Test Message',
                            },
                            content: 'This is a test message.',
                            createdAt: '2022-01-01T00:00:00.000Z',
                            read: true,
                        },
                    ],
                },
            },
        });
        const setNotificationCount = jest.fn();

        render(            <Router>
            <OldNotification setNotificationCount={setNotificationCount} />
        </Router>);
        await waitFor(() => {
            const messageNotification = screen.getByText('Message Notification');
            expect(messageNotification).toBeInTheDocument();
        });
    });


    it('should render a friend request notification', async() => {
        axios.get.mockResolvedValue({
            data: {
                data: {
                    notifications: [
                        {
                            type: 'follow',
                            contentID: {
                                userID: {
                                    username: 'Test User',
                                    profilePicture: 'Test Picture',
                                },
                                id: '1',
                                title: 'Test Message',
                            },
                            content: 'This is a test follow.',
                            createdAt: '2022-01-01T00:00:00.000Z',
                            read: true,
                        },
                    ],
                },
            },
        });
        const setNotificationCount = jest.fn();

        render(            <Router>
            <OldNotification setNotificationCount={setNotificationCount} />
        </Router>);
        await waitFor(() => {
            const messageNotification = screen.getByText('Follow Notification');
            expect(messageNotification).toBeInTheDocument();
        });
    });

});