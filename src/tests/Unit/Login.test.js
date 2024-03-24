import Login from "../../pages/Login";
import { render, screen,fireEvent } from "@testing-library/react";
import { GoogleOAuthProvider } from '@react-oauth/google';

describe("Login Component", () => {
    /*CASES RELATED TO RENDERING AND CONDITIONAL RENDERING */
  test("renders Login button", () => {
    render(
      <GoogleOAuthProvider>
        <Login />
      </GoogleOAuthProvider>
    );
    expect(screen.getByTestId('login-btn')).toBeInTheDocument();
  });
  test("renders GoogleLogin component", () => {
    render(
      <GoogleOAuthProvider>
        <Login />
      </GoogleOAuthProvider>
    );
    expect(screen.getByText(/Login with Google/i)).toBeInTheDocument();
  });
  test("renders FacebookLogin component", () => {
    render(
      <GoogleOAuthProvider>
        <Login />
      </GoogleOAuthProvider>
    );
    expect(screen.getByText(/Login with Facebook/i)).toBeInTheDocument();
  });
  test("renders user input", () => {
    render(
      <GoogleOAuthProvider>
        <Login />
      </GoogleOAuthProvider>
    );
    const userInput = screen.getByLabelText(/username/i);
    expect(userInput).toBeInTheDocument();
  });
    test("renders password input", () => {
        render(
        <GoogleOAuthProvider>
            <Login />
        </GoogleOAuthProvider>
        );
        const passwordInput = screen.getByLabelText(/password/i);
        expect(passwordInput).toBeInTheDocument();
    });

    test("renders remember me checkbox", () => {
        render(
        <GoogleOAuthProvider>
            <Login />
        </GoogleOAuthProvider>
        );
        const rememberMe = screen.getByLabelText(/remember me/i);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(rememberMe).toBeInTheDocument();
    });
    test("login button is disabled when login and password are empty", () => {
        render(
            <GoogleOAuthProvider>
                <Login />
            </GoogleOAuthProvider>
        );
        const loginButton = screen.getByTestId('login-btn');
        expect(loginButton).toBeDisabled();
    });
    test("login button is enabled when login and password are filled", () => {
        render(
            <GoogleOAuthProvider>
                <Login />
            </GoogleOAuthProvider>
        );
        const userInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByTestId('login-btn');

        fireEvent.change(userInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password08' } });

        expect(loginButton).toBeEnabled();
    });
    test("login button is disabled when login is empty", () => {
        render(
            <GoogleOAuthProvider>
                <Login />
            </GoogleOAuthProvider>
        );
        const userInput = screen.getByLabelText(/username/i);
        const loginButton = screen.getByTestId('login-btn');

        fireEvent.change(userInput, { target: { value: '' } });

        expect(loginButton).toBeDisabled();
    });
    test("login button is disabled when password is empty", () => {
        render(
            <GoogleOAuthProvider>
                <Login />
            </GoogleOAuthProvider>
        );
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByTestId('login-btn');

        fireEvent.change(passwordInput, { target: { value: '' } });

        expect(loginButton).toBeDisabled();
    });
    test("Renders the forget password link", () => {
        render(
            <GoogleOAuthProvider>
                <Login />
            </GoogleOAuthProvider>
        );
        expect(screen.getByText(/Forgot password?/i)).toBeInTheDocument();
    }
    );
    test("Renders the sign up link", () => {
        render(
            <GoogleOAuthProvider>
                <Login />
            </GoogleOAuthProvider>
        );
        expect(screen.getByText(/Register/i)).toBeInTheDocument();
    }
    );
    test("Renders the h2 with 'Login'", () => {
        render(
            <GoogleOAuthProvider>
                <Login />
            </GoogleOAuthProvider>
        );
        expect(screen.getByRole('heading', { name: /login/i, level: 2 })).toBeInTheDocument();
    });
    /*TESTS RELATED TO FUNCTIONALITY*/
    test("Username is required appears when username is empty and user touches the field", () => {
        render(
            <GoogleOAuthProvider>
                <Login />
            </GoogleOAuthProvider>
        );
        const userInput = screen.getByLabelText(/username/i);
        const loginButton = screen.getByTestId('login-btn');

        fireEvent.change(userInput, { target: { value: '' } });
        fireEvent.blur(userInput);

        expect(screen.getByText(/Username is required/i)).toBeInTheDocument();
        expect(loginButton).toBeDisabled();
    });
    test("Password is required appears when password is empty and user touches the field", () => {
        render(
            <GoogleOAuthProvider>
                <Login />
            </GoogleOAuthProvider>
        );
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByTestId('login-btn');

        fireEvent.change(passwordInput, { target: { value: '' } });
        fireEvent.blur(passwordInput);

        expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
        expect(loginButton).toBeDisabled();
    });
    test("Renders the forget password component when the link is clicked", () => {
        render(
            <GoogleOAuthProvider>
                <Login />
            </GoogleOAuthProvider>
        );
        const forgetPassword = screen.getByText(/Forgot password?/i);
        fireEvent.click(forgetPassword);
        expect(screen.getByText(/Reset Password/i)).toBeInTheDocument();
        
    }
    );


});
