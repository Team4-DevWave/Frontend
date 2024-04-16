import React from "react";
import ForgetUsername from "../components/ForgetUsername";
import { Meta} from "@storybook/addon-docs/blocks";

<Meta title="Components/ForgetUsername" component={ForgetUsername} />

export default {
    title: "Auth/ForgetUsername Component",
    component: ForgetUsername,
    tags: ['autodocs'],

    argTypes: {
        email: { control: { disable: true } },
        cancelBtn: { control: { disable: true } },
        submitBtn: { control: { disable: true } },
    },
}
/** Prompts user to enter a verified email to send a reset email with a redirection link to a reset username page */
export const ForgetUsernameForm = (args) => (
    <>
        <ForgetUsername />
    </>
);
