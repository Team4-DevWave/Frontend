import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import Sidebar from "../../layouts/Sidebar";

describe("Sidebar", () => {
  test("renders Sidebar component without crashing", () => {
    render(<Sidebar />);
  });

  test("renders anchor tags", async () => {
    render(<Sidebar />);
    const links = await screen.findAllByRole("link");
    expect(links).toHaveLength(18);
  });

  test("renders details and summary", () => {
    render(<Sidebar />);
    const details = screen.getAllByRole("group");
    expect(details.length).toBeGreaterThan(0);
  });

  test("toggles details when summary is clicked", () => {
    render(<Sidebar />);
    const groups = screen.getAllByRole("group");

    // Check that the details are initially expanded
    groups.forEach((group) => {
      expect(group).toHaveAttribute("open");
    });

    // Click each summary
    groups.forEach((group) => {
      const { getByTestId } = within(group);
      const summary = getByTestId("summary");
      fireEvent.click(summary);
    });

    // Check that the details are collapsed after clicking the summary
    groups.forEach((group) => {
      expect(group).not.toHaveAttribute("open");
    });
  });

  test("renders the correct text in the summary", () => {
    render(<Sidebar />);
    const summaries = screen.getAllByTestId("summary");
    const expectedText = ["RECENT", "COMMUNITIES", "RESOURCES"];

    summaries.forEach((summary, index) => {
      expect(summary).toHaveTextContent(expectedText[index]);
    });
  });
  test("renders the correct text in resources", () => {
    render(<Sidebar />);
    const expectedText = [
      "About Threadit",
      "Advertise",
      "Help",
      "Blog",
      "Careers",
      "Press",
      "Communities",
      "Best of Threadit",
      "Topics",
      "Content Policy",
      "Privacy Policy",
      "User Agreement",
    ];

    const resourcesList = screen.getByTestId("resources-list");
    const resourcesItems = within(resourcesList).getAllByRole("listitem");

    resourcesItems.forEach((item, index) => {
      expect(item).toHaveTextContent(expectedText[index]);
    });
  });

  test("renders imgs", () => {
    render(<Sidebar />);
    const imgs = screen.getAllByRole("img");
    expect(imgs).toHaveLength(2);
  });

  test("renders svgs", () => {
    render(<Sidebar />);
    const svgs = screen.getAllByRole("svg");
    expect(svgs).toHaveLength(18);
  });
});
