import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../../layouts/Header";
import userEvent from "@testing-library/user-event";

describe("Header", () => {
  test("renders Header component", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("renders logo", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const logo = screen.getByAltText("threadit logo");
    expect(logo).toBeInTheDocument();
  });

  test("renders profile pic", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const profilePic = screen.getAllByAltText("profile pic");
    expect(profilePic.length).toBeGreaterThan(0);
  });

  test("renders navigation links", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(8); // Adjust this based on the number of links in your Header
  });

  test("renders imgs", async () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const imgs = await screen.findAllByRole("img"); // imgs are generally treated as "img" role
    expect(imgs).toHaveLength(3); // Adjust this based on the number of imgs in your Header
  });

  test("sub-menu is not visible before clicking on the img", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const subMenu = screen.queryByTestId("menu");
    expect(subMenu).toBeInTheDocument(); // Check if the sub-menu is in the DOM
    expect(subMenu).not.toHaveClass("open-menu"); // Check if it doesn't have the open-menu class
  });

  test("sub-menu is visible after clicking on the img", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const img = screen.getAllByRole("img");
    userEvent.click(img[0]);
    const subMenu = screen.getByTestId("menu");
    expect(subMenu).toBeVisible();
  });

  test("navigates to home page when home is clicked", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const home = screen.getByAltText("threadit logo");
    fireEvent.click(home);
    expect(window.location.pathname).toBe("/");
  });
});
