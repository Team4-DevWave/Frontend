import Signup from "../../pages/Signup";
import { render, screen, fireEvent } from "@testing-library/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import userEvent from "@testing-library/user-event";
import ReCAPTCHA from "react-google-recaptcha";

describe("Signup Component", () => {
  /*CASES RELATED TO RENDERING AND CONDITIONAL RENDERING */
  test("renders Signup button", () => {
    render(
      <GoogleOAuthProvider>
        <Signup />
      </GoogleOAuthProvider>
    );
    expect(screen.getByTestId("signup-btn")).toBeInTheDocument();
  });
  test("renders GoogleSignup component", () => {
    render(
      <GoogleOAuthProvider>
        <Signup />
      </GoogleOAuthProvider>
    );
    expect(screen.getByText(/Signup with Google/i)).toBeInTheDocument();
  });
  test("renders FacebookSignup component", () => {
    render(
      <GoogleOAuthProvider>
        <Signup />
      </GoogleOAuthProvider>
    );
    expect(screen.getByText(/Signup with Facebook/i)).toBeInTheDocument();
  });
  test("renders user input", () => {
    render(
      <GoogleOAuthProvider>
        <Signup />
      </GoogleOAuthProvider>
    );
    const userInput = screen.getByLabelText(/username/i);
    expect(userInput).toBeInTheDocument();
  });
  test("renders password input", () => {
    render(
      <GoogleOAuthProvider>
        <Signup />
      </GoogleOAuthProvider>
    );
    const passwordInput = screen.getByTestId("password");
    expect(passwordInput).toBeInTheDocument();
  });

  test("Signup button is disabled when Signup and password are empty", () => {
    render(
      <GoogleOAuthProvider>
        <Signup />
      </GoogleOAuthProvider>
    );
    const SignupButton = screen.getByTestId("signup-btn");
    expect(SignupButton).toBeDisabled();
  });

  test("Signup button is disabled when Signup is empty", () => {
    render(
      <GoogleOAuthProvider>
        <Signup />
      </GoogleOAuthProvider>
    );
    const userInput = screen.getByLabelText(/username/i);
    const SignupButton = screen.getByTestId("signup-btn");

    fireEvent.change(userInput, { target: { value: "" } });

    expect(SignupButton).toBeDisabled();
  });
  test("Signup button is disabled when password is empty", () => {
      render(
          <GoogleOAuthProvider>
              <Signup />
          </GoogleOAuthProvider>
      );
      const passwordInput = screen.getByLabelText('Password');
      const signupButton = screen.getByTestId('signup-btn');

      fireEvent.change(passwordInput, { target: { value: '' } });

      expect(signupButton).toBeDisabled();
  });

  test("Renders the login link", () => {
    render(
      <GoogleOAuthProvider>
        <Signup />
      </GoogleOAuthProvider>
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
  test("Renders the h2 with 'Signup'", () => {
    render(
      <GoogleOAuthProvider>
        <Signup />
      </GoogleOAuthProvider>
    );
    expect(
      screen.getByRole("heading", { name: /Signup/i, level: 2 })
    ).toBeInTheDocument();
  });
  /*TESTS RELATED TO FUNCTIONALITY*/
  test("Username is required appears when username is empty and user touches the field", () => {
    render(
      <GoogleOAuthProvider>
        <Signup />
      </GoogleOAuthProvider>
    );
    const userInput = screen.getByLabelText(/username/i);
    const SignupButton = screen.getByTestId("signup-btn");

    fireEvent.change(userInput, { target: { value: "" } });
    fireEvent.blur(userInput);

    expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
    expect(SignupButton).toBeDisabled();
  });
  test("Password is required appears when password is empty and user touches the field", () => {
    render(
      <GoogleOAuthProvider>
        <Signup />
      </GoogleOAuthProvider>
    );
    const passwordInput = screen.getByLabelText("Password");
    const SignupButton = screen.getByTestId("signup-btn");

    fireEvent.change(passwordInput, { target: { value: "" } });
    fireEvent.blur(passwordInput);

    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    expect(SignupButton).toBeDisabled();
  });
  test("Password and confirm password should match", () => {
    render(
      <GoogleOAuthProvider>
        <Signup />
      </GoogleOAuthProvider>
    );
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const SignupButton = screen.getByTestId("signup-btn");

    fireEvent.change(passwordInput, { target: { value: "password1" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "password2" } });
    fireEvent.blur(confirmPasswordInput);

    expect(SignupButton).toBeDisabled();
  });
  test("Google captcha renders",()=>{
    render(
      <GoogleOAuthProvider>
        <Signup />
      </GoogleOAuthProvider>
    );
    expect(screen.getByTestId('captcha')).toBeInTheDocument();
  });

  // jest.mock('react-google-recaptcha', () => {
  //   return {
  //     __esModule: true,
  //     default: jest.fn().mockImplementation(({ onChange }) => {
  //       return <div data-testid="captcha" onClick={() => onChange('captcha value')} />;
  //     }),
  //   };
  // });
  // test("Signup button is enabled when all fields are filled correctly", ()=>{
  //   render(
  //     <GoogleOAuthProvider>
  //       <Signup />
  //     </GoogleOAuthProvider>
  //   );
  //   const userInput = screen.getByLabelText(/username/i);
  //   const emailInput = screen.getByLabelText(/email/i);
  //   const passwordInput = screen.getByLabelText("Password");
  //   const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  //   const SignupButton = screen.getByTestId("signup-btn");
  //   const captcha = screen.getByTestId('captcha');
  //   fireEvent.change(userInput, { target: { value: "username1" } });
  //   fireEvent.change(emailInput, { target: { value: "username1@gmail.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "password1" } });
  //   fireEvent.change(confirmPasswordInput, { target: { value: "password1" } });
  //   userEvent.click(captcha);
  //   fireEvent.blur(confirmPasswordInput);
  //   expect(SignupButton).toBeEnabled();
  

  // });
});
