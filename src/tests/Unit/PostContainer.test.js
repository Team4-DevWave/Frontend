import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import PostContainer from "../../components/PostContainer";

describe("PostContainer", () => {
  const mockPost = {
    username: "testuser",
    community: "testcommunity",
    Date: "2024-04-16T16:12:49.407Z",
    title: "testtitle",
    text: "testcontent",
    votes: { upvotes: 0, downvotes: 0 },
  };

  test("renders PostContainer component", () => {
    render(
      <Router>
        <PostContainer postData={mockPost} />
      </Router>
    );
  });
  // test("upvote increases count", () => {
  //   render(<PostContainer />);
  //   const upvoteButton = screen.getByRole("button", { name: /upvote/i });
  //   fireEvent.click(upvoteButton);
  //   expect(screen.getByText("1")).toBeInTheDocument();
  // });

  // test("downvote decreases count", () => {
  //   render(<PostContainer />);
  //   const downvoteButton = screen.getByRole("button", { name: /downvote/i });
  //   fireEvent.click(downvoteButton);
  //   expect(screen.getByText("-1")).toBeInTheDocument();
  // });

  // test("upvote and downvote buttons cancel previous vote when clicked again", async () => {
  //   render(<PostContainer />);
  //   const upvoteButton = screen.getByRole("button", { name: /upvote/i });
  //   const downvoteButton = screen.getByRole("button", { name: /downvote/i });

  //   // Check initial count
  //   // expect(screen.getByTestId("upvote-count")).toHaveTextContent("0");

  //   // Upvote and check count
  //   fireEvent.click(upvoteButton);
  //   await waitFor(() =>
  //     expect(screen.getByTestId("upvote-count")).toHaveTextContent("1")
  //   );

  //   // Click upvote again to cancel and check count
  //   fireEvent.click(upvoteButton);
  //   expect(screen.getByTestId("upvote-count")).toHaveTextContent("0");

  //   // Downvote and check count
  //   fireEvent.click(downvoteButton);
  //   expect(screen.getByTestId("upvote-count")).toHaveTextContent("-1");

  //   // Click downvote again to cancel and check count
  //   fireEvent.click(downvoteButton);
  //   expect(screen.getByTestId("upvote-count")).toHaveTextContent("0");
  // });

  test("renders navigation links", () => {
    render(
      <Router>
        <PostContainer postData={mockPost} />
      </Router>
    );
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0); // Adjust this based on the number of links in your Header
  });

  test("renders svgs", async () => {
    render(
      <Router>
        <PostContainer postData={mockPost} />
      </Router>
    );
    const svgs = await screen.findAllByRole("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });

  test("sub-menu is not visible before clicking on the img", () => {
    render(
      <Router>
        <PostContainer postData={mockPost} />
      </Router>
    );
    const subMenu = screen.queryByTestId("menu");
    expect(subMenu).toBeInTheDocument(); // Check if the sub-menu is in the DOM
    expect(subMenu).not.toHaveClass("open-menu"); // Check if it doesn't have the open-menu class
  });

  test("sub-menu is visible after clicking on share", () => {
    render(
      <Router>
        <PostContainer postData={mockPost} />
      </Router>
    );
    const button = screen.getAllByRole("button");
    fireEvent.click(button[2]);
    const subMenu = screen.getByTestId("menu");
    expect(subMenu).toBeVisible();
  });

  // test("renders post and handles user interaction", () => {
  //   const mockPost = {
  //     username: "testuser",
  //     community: "testcommunity",
  //     Date: "2024-04-16T16:12:49.407Z",
  //     title: "testtitle",
  //     text: "testcontent",
  //     votes: { upvotes: 0, downvotes: 0 },
  //   };
  //   const mockHandleInteraction = jest.fn();

  //   render(
  //     <Router>
  //       <PostContainer
  //         postData={mockPost}
  //         onInteraction={mockHandleInteraction}
  //       />
  //     </Router>
  //   );

  //   expect(screen.getByText(mockPost.title)).toBeInTheDocument();
  //   expect(screen.getByText(mockPost.body)).toBeInTheDocument();

  //   const interactionElement = screen.getByText("Interact"); // Replace 'Interact' with the actual text or label
  //   fireEvent.click(interactionElement);
  //   expect(mockHandleInteraction).toHaveBeenCalled();
  // });
});
