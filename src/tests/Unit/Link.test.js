import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import Post from "../../components/Create_Post/Link";
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
  
  fireEvent.change(Title, { target: { value: 'Test case ' } });
  fireEvent.change(text, { target: { value: 'https://www.bing.com/search?pglt=41&q=reddit&cvid=3ffe561db2bf47b0bf43cf179d0d7fd7&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMgYIBRAAGEAyBggGEAAYQDIGCAcQRRg8MgYICBBFGDwyBwgJEEUY_FXSAQgyNTQzajBqMagCALACAA&FORM=ANNAB1&PC=DCTS ' } });
  
  fireEvent.click(button1);
  expect(Title.value).toBe('Test case ');
  
  });

  test("test case 2", () => {
    render(<Post/>);
  
    const Title = screen.getByTestId("title");
    const text = screen.getByTestId("text");
    const button1 = screen.getByTestId("post");
  
    fireEvent.change(Title, { target: { value: 'Test case ' } });
  
    fireEvent.change(text, { target: { value: 'https://www.reddit.com/submit' } });
  
    fireEvent.click(button1);
  
    expect(text.value).toBe('https://www.reddit.com/submit');
  });
  
  

test(" test case 3", ()=> 
{
render(<Post/>);
const text = screen.getByTestId("text");
const button1 = screen.getByTestId("post");
fireEvent.change(text, { target: { value: 'https://www.reddit.com/submit' } });

expect(button1).toBeDisabled();

});



test(" test case 4", ()=> 
{
render(<Post/>);
const nobuttons = screen.getAllByRole("button");
expect(nobuttons).toHaveLength(7);

});


test(" test case 5", ()=> 
{
render(<Post/>);
const text = screen.getByTestId("text");
const button1 = screen.getByTestId("savedraft");
fireEvent.change(text, { target: { value: 'https://www.reddit.com/submit' } });

expect(button1).toBeDisabled();

});


});
