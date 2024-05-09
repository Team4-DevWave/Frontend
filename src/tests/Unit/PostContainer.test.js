import React from "react";
import {
  render,
  fireEvent,
  waitForElement,
  screen,
} from "@testing-library/react";
import PostContainer from "../../components/PostContainer";
import { BrowserRouter as Router } from "react-router-dom";

test("renders post with title and content", () => {
  const mockPost = {
    id: "1",
    title: "Test Title",
    content: "Test Content",
    time: "2021-10-10T00:00:00.000Z",
    votes: 10,
    numviews: 10,
    spoiler: false,
    nsfw: false,
    locked: false,
    approved: true,
    mentioned: [],
    username: "testuser",
    userpic: "https://www.example.com/test.jpg",
    commentsCount: 10,
    image: "",
    video: "",
    subredditID: "",
    ishide: false,
    issaved: false,
    userVote: "upvoted",
    Link: "",
    poll: {},
    userPollVote: {},
  };

  render(
    <Router>
      <PostContainer postData={mockPost} />
    </Router>
  );

  const titleElement = screen.getByText(/Test Title/i);
  const contentElement = screen.getByText(/Test Content/i);

  expect(titleElement).toBeInTheDocument();
  expect(contentElement).toBeInTheDocument();
});
