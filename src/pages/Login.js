import React, { useEffect } from "react";
import "./LoginForm.css";
import { FaUserAstronaut, FaFacebook, FaGoogle } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import ForgetPassword from "../components/ForgetPassword";
import { TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FiLogIn } from "react-icons/fi";
import { useGoogleLogin } from "@react-oauth/google";
import { LoginSocialFacebook } from "reactjs-social-login";
import axios from "axios";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

function Login() {
  let yourBearerToken = "";
  const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
  };

  const navigate = useNavigate();
  const theme = useTheme();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [touchedUser, setTouchedUser] = React.useState(false);
  const [touchedPassword, setTouchedPassword] = React.useState(false);
  const [remember, setRemember] = React.useState(false);
  const [attempted, setAttempted] = React.useState(false);
  const [validUser, setValidUser] = React.useState(false);
  const [validPassword, setValidPassword] = React.useState(false);

  useEffect(() => {
    setValidUser(username.match(/^[a-zA-Z0-9_]{3,16}$/));
    setValidPassword(password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/));
  }, [username, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/api/v1/users/login",
        {
          username: username,
          email: "",
          password: password,
        },
        config,
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("User is found");
          const token = response.data.token;
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          localStorage.setItem("username",response.data.username);
          navigate("/");
        } else {
          console.log("User is not found");
          setAttempted(true);
        }

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setAttempted(true);
      });
  };
  const googleLogin = useGoogleLogin({
    clientId:
      "500020411396-l7soq48qpasrds9ipgo5nff5656i0ial.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
    onSucess: (response) => {
      console.log(response);
    },
    onFail: (response) => {
      console.log(response);
    },
    onRequest: () => {
      console.log("loading");
    },
    onLogout: () => {
      console.log("logout");
    },
  });

  return (
    <div className="wrapper">
      <div className="background-div">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <TextField
            InputProps={{
              endAdornment: <FaUserAstronaut />,
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Username"
            type="text"
            error={(!username && touchedUser) || (touchedUser && !validUser)}
            helperText={
              !username && touchedUser
                ? "Username is required"
                : "" || (!validUser && touchedUser)
                  ? "Invalid Username"
                  : ""
            }
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onBlur={() => setTouchedUser(true)}
          />

          <TextField
            InputProps={{
              endAdornment: <TbPasswordFingerprint />,
            }}
            sx={{ width: "100%" }}
            label="Password"
            type="password"
            required
            error={
              (!password && touchedPassword) ||
              (touchedPassword && !validPassword) ||
              attempted
            }
            helperText={
              !password && touchedPassword
                ? "Password is required"
                : "" || (!validPassword && touchedPassword)
                  ? "Invalid Password"
                  : "" || attempted
                    ? "Invalid Username or Password"
                    : ""
            }
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onBlur={() => setTouchedPassword(true)}
          />

          <div className="remember-forgot">
            <label className="custom-checkbox">
              <input
                name="dummy"
                type="checkbox"
                onChange={(e) => setRemember(e.target.value)}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <ForgetPassword />
          </div>
          <Button
            data-testid="login-btn"
            variant="contained"
            sx={{
              width: "100%",
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#FF5700",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
            startIcon={<FiLogIn />}
            disabled={!validUser || !validPassword}
            type="submit"
          >
            Login
          </Button>

          <LoginSocialFacebook
            appId="736104705323820"
            onResolve={(response) => {}}
            onReject={(response) => {}}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: "100%", marginTop: "10px", padding: "10px" }}
              startIcon={<FaFacebook />}
            >
              Login with Facebook
            </Button>
          </LoginSocialFacebook>

          <Button
            id="googlebtn"
            onClick={() => googleLogin()}
            variant="contained"
            color="primary"
            sx={{ width: "100%", marginTop: "10px", padding: "10px" }}
            startIcon={<FaGoogle />}
          >
            {" "}
            Login with Google
          </Button>

          <div className="register-link">
            <p>
              Don't have an account? <a href="/signup">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

//JSDocs comments for Storybook

Login.propTypes = {
  /** mandatory username, displays error message if touched and left empty */
  username: PropTypes.string,
  /** mandatory password displays error message if touched and left empty  */
  password: PropTypes.string,
  /** Checks that user field was touched */
  touchedUser: PropTypes.bool,
  /** Checks that password field was touched */
  touchedPassword: PropTypes.bool,
  /** Remember password checkbox */
  remember: PropTypes.bool,
  /** Checks if login was attempted */
  attempted: PropTypes.bool,
  /** Checks if username is valid */
  validUser: PropTypes.bool,
  /** Checks if password is valid */
  validPassword: PropTypes.bool,

  /** Handles form submission */
  handleSubmit: PropTypes.func,
  /** Handles google login */
  googleLogin: PropTypes.func,

  /** Handles navigation to home upon successful login
   * successful login requires all fields to be valid, username and password to be found in the database
   */
  navigate: PropTypes.func,
  /** Material UI theme */
  theme: PropTypes.object,
};
