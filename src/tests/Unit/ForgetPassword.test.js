import { render, screen,fireEvent } from "@testing-library/react";
import ForgetPassword from "../../components/ForgetPassword";

describe("ForgetPassword Component", () => {
  
    test("renders the forget password form", () => {
        render(
            <ForgetPassword />
        );
        const forgetPassword = screen.getByText(/Forgot password?/i);
        fireEvent.click(forgetPassword);
        expect(screen.getByText(/Enter your email address to reset your password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Cancel/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument();
    });
    test("check that the submit button is disabled if no email is entered", () => {
        render(
            <ForgetPassword />
        );
        const forgetPassword = screen.getByText(/Forgot password?/i);
        fireEvent.click(forgetPassword);
        const submitButton = screen.getByRole('button',{name:/Submit/i});
        expect(submitButton).toBeDisabled();
    });
    test("check that the submit button is enabled if a valid email is entered", () => {
        render(
            <ForgetPassword />
        );
        const forgetPassword = screen.getByText(/Forgot password?/i);
        fireEvent.click(forgetPassword);
        const submitButton = screen.getByRole('button',{name:/Submit/i});
        const emailInput = screen.getByLabelText(/email address/i);
        fireEvent.change(emailInput, { target: { value: 'mo.ashraf.mcs@gmail.com' } });
        expect(submitButton).toBeEnabled();
    });
    test("check that the submit button is disabled if an invalid email is entered", () => {
        render(
            <ForgetPassword />
        );
        const forgetPassword = screen.getByText(/Forgot password?/i);
        fireEvent.click(forgetPassword);
        const submitButton = screen.getByRole('button',{name:/Submit/i});
        const emailInput = screen.getByLabelText(/email address/i);
        fireEvent.change(emailInput, { target: { value: 'mo.ashraf.mcs' } });
        expect(submitButton).toBeDisabled();
    });

});