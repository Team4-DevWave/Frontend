import React from "react";
import ForgetPassword from "../components/ForgetPassword";

export default {
    title: "Auth/ForgetPassword Component",
    component: ForgetPassword,
    tags: ['autodocs'],

    argTypes: {
        email: { control: { disable: true } },
        username: { control: { disable: true } },
        cancelBtn: { control: { disable: true } },
        submitBtn: { control: { disable: true } },
    },
}
/** Prompts user to enter a verified email to send a reset email with a redirection link to a reset password page */
export const ForgetPasswordForm = (args) => (
    <>
        <ForgetPassword />
    </>
);
