import Login from "../pages/Login";
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Meta} from "@storybook/addon-docs/blocks";
<Meta title="Components/Login" component={Login} />
export default {
  title: "Auth/Login Component",
  component: Login,


  tags: ['autodocs'],
  argTypes: {
    username: { control: { disable: true } },
    password: { control: { disable: true } },
    touchedUser: { control: { disable: true } },
    touchedPassword: { control: { disable: true } },
    remember: { control: { disable: true } },
    attempted: { control: { disable: true } },
    validUser: { control: { disable: true } },
    validPassword: { control: { disable: true } },

  },
 
};

/** Login component verifies username and password fields */

export const LoginForm = (args) => (
  <>
    
    <GoogleOAuthProvider clientId="500020411396-l7soq48qpasrds9ipgo5nff5656i0ial.apps.googleusercontent.com">
      <Router>
        <Login />
      </Router>
    </GoogleOAuthProvider>
  </>
);
