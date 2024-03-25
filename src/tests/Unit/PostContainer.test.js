import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PostContainer from "../../components/PostContainer";

describe("PostContainer", () => {
  test("renders PostContainer component", () => {
    render(<PostContainer />);
  });
  test("upvote increases count", () => {
    render(<PostContainer />);
    const upvoteButton = screen.getByRole("button", { name: /upvote/i });
    fireEvent.click(upvoteButton);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("downvote decreases count", () => {
    render(<PostContainer />);
    const downvoteButton = screen.getByRole("button", { name: /downvote/i });
    fireEvent.click(downvoteButton);
    expect(screen.getByText("-1")).toBeInTheDocument();
  });

  test("upvote and downvote buttons cancel previous vote when clicked again", async () => {
    render(<PostContainer />);
    const upvoteButton = screen.getByRole("button", { name: /upvote/i });
    const downvoteButton = screen.getByRole("button", { name: /downvote/i });

    // Check initial count
    expect(screen.getByTestId("upvote-count")).toHaveTextContent("0");

    // Upvote and check count
    fireEvent.click(upvoteButton);
    await waitFor(() =>
      expect(screen.getByTestId("upvote-count")).toHaveTextContent("1")
    );

    // Click upvote again to cancel and check count
    fireEvent.click(upvoteButton);
    expect(screen.getByTestId("upvote-count")).toHaveTextContent("0");

    // Downvote and check count
    fireEvent.click(downvoteButton);
    expect(screen.getByTestId("upvote-count")).toHaveTextContent("-1");

    // Click downvote again to cancel and check count
    fireEvent.click(downvoteButton);
    expect(screen.getByTestId("upvote-count")).toHaveTextContent("0");
  });

  test("renders navigation links", () => {
    render(<PostContainer />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4); // Adjust this based on the number of links in your Header
  });

  test("renders svgs", async () => {
    render(<PostContainer />);
    const svgs = await screen.findAllByRole("svg");
    expect(svgs).toHaveLength(5);
  });

  test("sub-menu is not visible before clicking on the img", () => {
    render(<PostContainer />);
    const subMenu = screen.queryByTestId("menu");
    expect(subMenu).toBeInTheDocument(); // Check if the sub-menu is in the DOM
    expect(subMenu).not.toHaveClass("open-menu"); // Check if it doesn't have the open-menu class
  });

  test("sub-menu is visible after clicking on share", () => {
    render(<PostContainer />);
    const button = screen.getAllByRole("button");
    fireEvent.click(button[2]);
    const subMenu = screen.getByTestId("menu");
    expect(subMenu).toBeVisible();
  });
});
