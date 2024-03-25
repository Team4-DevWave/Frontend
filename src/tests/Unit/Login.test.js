import Login from "../../pages/Login";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
const axios = require("axios");
// const { TextEncoder, TextDecoder } = require('util');
// import {server} from "../../mocks/server";

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

describe("Login Component", () => {
  /*CASES RELATED TO RENDERING AND CONDITIONAL RENDERING */
  test("renders Login button", () => {
    render(
      <GoogleOAuthProvider>
        <Router>
          <Login />
        </Router>
      </GoogleOAuthProvider>
    );
    expect(screen.getByTestId("login-btn")).toBeInTheDocument();
  });
  test("renders GoogleLogin component", () => {
    render(
      <GoogleOAuthProvider>
        <Router>
          <Login />
        </Router>
      </GoogleOAuthProvider>
    );
    expect(screen.getByText(/Login with Google/i)).toBeInTheDocument();
  });
  test("renders FacebookLogin component", () => {
    render(
      <GoogleOAuthProvider>
        <Router>
          <Login />
        </Router>
      </GoogleOAuthProvider>
    );
    expect(screen.getByText(/Login with Facebook/i)).toBeInTheDocument();
  });
  test("renders user input", () => {
    render(
      <GoogleOAuthProvider>
        <Router>
          <Login />
        </Router>
      </GoogleOAuthProvider>
    );
    const userInput = screen.getByLabelText(/username/i);
    expect(userInput).toBeInTheDocument();
  });
  test("renders password input", () => {
    render(
      <GoogleOAuthProvider>
        <Router>
          <Login />
        </Router>
      </GoogleOAuthProvider>
    );
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test("renders remember me checkbox", () => {
    render(
      <GoogleOAuthProvider>
        <Router>
          <Login />
        </Router>
      </GoogleOAuthProvider>
    );
    const rememberMe = screen.getByLabelText(/remember me/i);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(rememberMe).toBeInTheDocument();
  });
  test("login button is disabled when login and password are empty", () => {
    render(
      <GoogleOAuthProvider>
        <Router>
          <Login />
        </Router>
      </GoogleOAuthProvider>
    );
    const loginButton = screen.getByTestId("login-btn");
    expect(loginButton).toBeDisabled();
  });
  test("login button is enabled when login and password are filled", () => {
    render(
      <GoogleOAuthProvider>
        <Router>
          <Login />
        </Router>
      </GoogleOAuthProvider>
    );
    const userInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByTestId("login-btn");

    fireEvent.change(userInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password08" } });

    expect(loginButton).toBeEnabled();
  });
  test("login button is disabled when login is empty", () => {
    render(
      <GoogleOAuthProvider>
        <Router>
          <Login />
        </Router>
      </GoogleOAuthProvider>
    );
    const userInput = screen.getByLabelText(/username/i);
    const loginButton = screen.getByTestId("login-btn");

    fireEvent.change(userInput, { target: { value: "" } });

    expect(loginButton).toBeDisabled();
  });
  test("login button is disabled when password is empty", () => {
    render(
      <GoogleOAuthProvider>
        <Router>
          <Login />
        </Router>
      </GoogleOAuthProvider>
    );
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByTestId("login-btn");

    fireEvent.change(passwordInput, { target: { value: "" } });

    expect(loginButton).toBeDisabled();
  });
  test("Renders the forget password link", () => {
    render(
      <GoogleOAuthProvider>
        <Router>
          <Login />
        </Router>
      </GoogleOAuthProvider>
    );
    expect(screen.getByText(/Forgot password?/i)).toBeInTheDocument();
  });
  test("Renders the sign up link", () => {
    render(
      <GoogleOAuthProvider>
        <Router>
          <Login />
        </Router>
      </GoogleOAuthProvider>
    );
    expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });
  test("Renders the h2 with 'Login'", () => {
    render(
      <GoogleOAuthProvider>
        <Router>
          <Login />
        </Router>
      </GoogleOAuthProvider>
    );
    expect(
      screen.getByRole("heading", { name: /login/i, level: 2 })
    ).toBeInTheDocument();
  });
  /*TESTS RELATED TO FUNCTIONALITY*/
  test("Username is required appears when username is empty and user touches the field", () => {
    render(
      <GoogleOAuthProvider>
        <Router>
          <Login />
        </Router>
      </GoogleOAuthProvider>
    );
    const userInput = screen.getByLabelText(/username/i);
    const loginButton = screen.getByTestId("login-btn");

    fireEvent.change(userInput, { target: { value: "" } });
    fireEvent.blur(userInput);

    expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });
  test("Password is required appears when password is empty and user touches the field", () => {
    render(
      <GoogleOAuthProvider>
        <Router>
          <Login />
        </Router>
      </GoogleOAuthProvider>
    );
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByTestId("login-btn");

    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.blur(passwordInput);

    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });
  test("Renders the forget password component when the link is clicked", () => {
    render(
      <GoogleOAuthProvider>
        <Router>
          <Login />
        </Router>
      </GoogleOAuthProvider>
    );
    const forgetPassword = screen.getByText(/Forgot password?/i);
    fireEvent.click(forgetPassword);
    expect(screen.getByText(/Reset Password/i)).toBeInTheDocument();
  });
  /* MOCK API TEST */
  // test('logs in successfully', async () => {
  //     const { getByLabelText, getByText } = render(<Login />);

  //     fireEvent.change(getByLabelText(/username/i), {
  //       target: { value: 'testuser' },
  //     });
  //     fireEvent.change(getByLabelText(/password/i), {
  //       target: { value: 'testpassword00' },
  //     });

  //     fireEvent.click(getByText(/login/i));

  //     await waitFor(() => expect(localStorage.getItem('token')).toEqual('mock-jwt-token'));
  //   });
});
