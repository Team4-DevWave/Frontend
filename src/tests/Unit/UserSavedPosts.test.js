import React from 'react';
import { render, act } from '@testing-library/react';
import axios from 'axios';
import PostFeed from '../../components/UserTabs/UserSavedPost.js';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

describe('PostFeed', () => {
  it('fetches and displays posts', async () => {
    const posts = [
      // Add some mock posts here
    ];

    axios.get.mockResolvedValueOnce({ data: { data: { posts } } });

    let container;
    await act(async () => {
      container = render(
        <Router>
          <PostFeed />
        </Router>
      );
    });

    // Replace 'post-title' with the actual data-testid of the post title in your PostContainer component
    posts.forEach((post) => {
      expect(container.getByText(post.title)).toBeInTheDocument();
    });
  });

  it('displays a message when there are no posts', async () => {
    axios.get.mockResolvedValueOnce({ data: { data: { posts: [] } } });

    let container;
    await act(async () => {
      container = render(
        <Router>
          <PostFeed />
        </Router>
      );
    });

    expect(container.getByText("u/ hasn't saved posted yet")).toBeInTheDocument();
  });
});