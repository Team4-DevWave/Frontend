import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import Post from "../../components/Create_Post/Post";
describe("Post", () => {
  test("renders post component without crashing", () => {
    render(<Post />);
  });
  test("test case 1", ()=> 
  {
  render(<Post/>);
  
  const Title = screen.getByTestId("title");
  const text = screen.getByTestId("text");
  const button1 = screen.getByTestId("post");
  const button2 =screen.getByTestId("Bold");
  
  fireEvent.change(Title, { target: { value: 'Test case ' } });
  fireEvent.change(text, { target: { value: 'test case  ' } });
  fireEvent.click(button2);
  
  fireEvent.click(button1);
  expect(Title.value).toBe('Test case ');
  
  });

test("test case 2", ()=> 
{
render(<Post/>);
const Title = screen.getByTestId("title");
const text = screen.getByTestId("text");
const button1 = screen.getByTestId("post");
const button2 = screen.getByTestId("Bold");

fireEvent.change(Title, { target: { value: 'Test case ' } });
fireEvent.change(text, { target: { value: 'test case ' } });
fireEvent.click(button2);

fireEvent.click(button1);

expect(Title.value).toBe('Test case ');

});

test(" test case 3", ()=> 
{
render(<Post/>);
const text = screen.getByTestId("text");
const button1 = screen.getByTestId("post");
fireEvent.change(text, { target: { value: 'test case ' } });

expect(button1).toBeDisabled();

});

test(" test case 4", ()=> 
{
render(<Post/>);
const text = screen.getByTestId("text");
const button1 = screen.getByTestId("post");
fireEvent.change(text, { target: { value: 'test case' } });

fireEvent.click(button1);


});

test(" test case 5", ()=> 
{
render(<Post/>);
const nobuttons = screen.getAllByRole("button");
expect(nobuttons).toHaveLength(10);

});

});
