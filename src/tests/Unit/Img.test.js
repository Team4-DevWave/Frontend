import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Post from "../../components/Create_Post/Img";
import TestImage from "./test.png";

// Mock URL.createObjectURL
global.URL.createObjectURL = jest.fn();

describe("Post", () => {
  test("renders post component without crashing", () => {
    render(<Post />);
  });

  test("test case 1", () => {
    render(<Post />);

    const Title = screen.getByTestId("title");
    const content = screen.getByTestId("content");
    const button1 = screen.getByTestId("post");

    fireEvent.change(Title, { target: { value: "Test case " } });

    const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });

    fireEvent.change(content, {
      target: {
        files: [file]
      }
    });

    fireEvent.click(button1);

    expect(button1).toBeDisabled();

  });

  test(" test case 2", ()=> 
  {
  render(<Post/>);
  const button1 = screen.getByTestId("post");  
  expect(button1).toBeDisabled();
  
  });

  test(" test case 3", ()=> 
  {
  render(<Post/>);
  const nobuttons = screen.getAllByRole("button");
  expect(nobuttons).toHaveLength(5);
  
  });

});
