import Signup from "../pages/Signup";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Meta } from "@storybook/addon-docs/blocks";
<Meta title="Components/Login" component={Signup} />;
export default {
  title: "Auth/Signup Component",
  component: Signup,
  tags: ["autodocs"],
  argTypes: {
    username: { control: { disable: true } },
    password: { control: { disable: true } },
    touchedUser: { control: { disable: true } },
    touchedPassword: { control: { disable: true } },
    remember: { control: { disable: true } },
    attempted: { control: { disable: true } },
    validUser: { control: { disable: true } },
    validPassword: { control: { disable: true } },
    validEmail: { control: { disable: true } },
    validConfirmPassword: { control: { disable: true } },
    interests : { control: { disable: true } },
    captcha: { control: { disable: true } },
    handleSubmit: { control: { disable: true } },
    googleLogin: { control: { disable: true } },
    navigate: { control: { disable: true } },
    theme: { control: { disable: true } },

  },
};

/** Signup component to create new user */

export const SignupForm = (args) => (
  <>
    <GoogleOAuthProvider clientId="500020411396-l7soq48qpasrds9ipgo5nff5656i0ial.apps.googleusercontent.com">
      <Router>
        <Signup />
      </Router>
    </GoogleOAuthProvider>
  </>
);
