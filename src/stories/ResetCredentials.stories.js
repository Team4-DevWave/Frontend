import React from "react";
import ResetCredentials from "../pages/ResetCredentials";
import { Meta } from "@storybook/addon-docs/blocks";
<Meta title="Components/ResetCredentials" component={ResetCredentials} />
export default {
    title: "Auth/ResetCredentials Component",
    component: ResetCredentials,
    tags: ['autodocs'],
    argTypes: {
        resetCode: { control: { disable: true } },
        newPassword: { control: { disable: true } },
        confirmNewPassword: { control: { disable: true } },
    },
}

/** Redirected by backend URL  */
export const ResetCredentialsForm = (args) => (
    <>
        <ResetCredentials />
    </>
);