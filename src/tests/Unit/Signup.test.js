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
  // test("Password and confirm password should match", () => {
  //   render(
  //     <GoogleOAuthProvider>
  //       <Signup />
  //     </GoogleOAuthProvider>
  //   );
  //   const passwordInput = screen.getByLabelText("Password");
  //   const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  //   const SignupButton = screen.getByTestId("signup-btn");

  //   fireEvent.change(passwordInput, { target: { value: "password1" } });
  //   fireEvent.change(confirmPasswordInput, { target: { value: "password2" } });
  //   fireEvent.blur(confirmPasswordInput);

  //   expect(SignupButton).toBeDisabled();
  // });
  test("Google captcha renders",()=>{
    render(
      <GoogleOAuthProvider>
        <Signup />
      </GoogleOAuthProvider>
    );
    expect(screen.getByTestId('captcha')).toBeInTheDocument();
  });

  test("existing email arrests the form submission", () => {
    render(
      <GoogleOAuthProvider>
        <Signup />
      </GoogleOAuthProvider>
    );
    const emailInput = screen.getByLabelText("Email");
    const SignupButton = screen.getByTestId("signup-btn");

    fireEvent.change(emailInput, { target: { value: "ahussein.ali@eng-st-cu.edu.eg" } });
    fireEvent.blur(emailInput);
});

  // test("Signup button is enabled when all fields are filled", () => {
  //   render(
  //     <GoogleOAuthProvider>
  //       <Signup />
  //     </GoogleOAuthProvider>
  //   );
  //   const emailInput = screen.getByLabelText("Email");
  //   const passwordInput = screen.getByLabelText("Password");
  //   const confirmPasswordInput = screen.getByLabelText("Confirm Password");
  //   const SignupButton = screen.getByTestId("signup-btn");

  //   const randomNumber = Math.floor(Math.random() * 1000000);

  //   //generate random email
  //   fireEvent.change(emailInput, { target: { value: `${randomNumber}@gmail.com` } });
  //   fireEvent.change(passwordInput, { target: { value: "pass1234" } });
  //   fireEvent.change(confirmPasswordInput, { target: { value: "pass1234" } });

  //   expect(SignupButton).toBeEnabled();
  // });

});

