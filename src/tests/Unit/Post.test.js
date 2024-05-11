import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Post from '../../components/Create_Post/Post.js';
import { BrowserRouter as Router } from 'react-router-dom';


describe('Post component', () => {
  test('feature1 works as expected', () => {
    const { getByTestId } = render(
      <Router>
        <Post />
      </Router>
    );
    // replace 'feature1' with actual feature and write assertions
  });

  test('feature2 works as expected', () => {
    const { getByTestId } = render(
      <Router>
        <Post />
      </Router>
    );
    // replace 'feature2' with actual feature and write assertions
  });

  // Add more tests as needed for other features
});