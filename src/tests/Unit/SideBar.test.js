import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sidebar from "../../layouts/Sidebar";
import { BrowserRouter as Router } from "react-router-dom";

// Test the SideBar component
describe("SideBar", () => {
  it("renders the correct elements", () => {
    // Render the SideBar component
    render(
      <Router>
        <Sidebar />
      </Router>
    );

    // Assert that the component renders the expected elements
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("t/Akira")).toBeInTheDocument();
    expect(screen.getByText("COMMUNITIES")).toBeInTheDocument();
    expect(screen.getByText("FAVORITES")).toBeInTheDocument();
    expect(screen.getByText("RESOURCES")).toBeInTheDocument();
  });
});
