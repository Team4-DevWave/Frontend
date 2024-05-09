import React, { useEffect } from "react";
import "./LoginForm.css";
import { FaUserAstronaut, FaFacebook, FaGoogle } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import ForgetPassword from "../components/ForgetPassword";
import ForgetUsername from "../components/ForgetUsername";
import { TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FiLogIn } from "react-icons/fi";
import { useGoogleLogin } from "@react-oauth/google";
import { LoginSocialFacebook } from "reactjs-social-login";
import axios from "axios";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

function Login({toggleTheme}) {
  let yourBearerToken = "";

  const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
  };

  const navigate = useNavigate();

  const [showPassword,setShowPassword] = React.useState(false);

  const [userState, setUserState] = React.useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    touchedUser: false,
    touchedPassword: false,
    attempted: false,
    validUser: false,
    validPassword: false,
    validEmail: false,
    validConfirmPassword: false,
  });

  useEffect(() => {
    setUserState((prevState) => ({
      ...prevState,
      validUser: prevState.username.match(/^[a-zA-Z0-9_]{3,16}$/),
      validEmail: prevState.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),
      validPassword: prevState.password.match(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      ),
      
    }));
  }, [userState.username, userState.password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://www.threadit.tech/api/v1/users/login",
        {
          username: userState.username,
          email: userState.email,
          password: userState.password,
          mtoken: "NONE",
        },
        config
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("User is found");
          const token = response.data.token;
          Cookies.set("token", token, { expires: 7 });
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          localStorage.setItem("username", response.data.data.user.username);
          localStorage.setItem("subreddit", response.data.data.joinedSubreddits);
          navigate("/");
        } else {
          console.log("User is not found");
          setUserState(prevState=> ({...prevState, attempted: true}));
        }

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setUserState(prevState=> ({...prevState, attempted: true}));
      });
  };

  const googleLogin = useGoogleLogin({
    clientId:
      "500020411396-l7soq48qpasrds9ipgo5nff5656i0ial.apps.googleusercontent.com",
    scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
    onSuccess: (response) => {
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
      
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <TextField
            InputProps={{
              style: { borderRadius: 25 },
              endAdornment: <FaUserAstronaut />,
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Username or Email"
            type="text"
            error={(!userState.username && userState.touchedUser) || (userState.touchedUser && !userState.validUser)}
            helperText={
              !userState.username && userState.touchedUser
                ? "Username is required"
                : "" || (!userState.validUser && !userState.validEmail && userState.touchedUser)
                  ? "Invalid Username or Email"
                  : ""
            }
            required
            onChange={(e) => {
              setUserState((prevState) => ({
                ...prevState,
                username: e.target.value,
                email: e.target.value,
              }));
            }}
            onBlur={() => setUserState((prevState) => ({ ...prevState, touchedUser: true }))}
          />

          <TextField
            InputProps={{
              style: { borderRadius: 25 },
              endAdornment: <TbPasswordFingerprint
              onClick={() => {setShowPassword(!showPassword)}}
               />,
            }}
            sx={{ width: "100%" }}
            
            label="Password"
            type={showPassword ? "text" : "password"}
            required
            error={
              (!userState.password && userState.touchedPassword) ||
              (userState.touchedPassword && !userState.validPassword) ||
              userState.attempted
            }
            helperText={
              !userState.password && userState.touchedPassword
                ? "Password is required"
                : "" || (!userState.validPassword && userState.touchedPassword)
                  ? "Invalid Password"
                  : "" || userState.attempted
                    ? "Invalid Username or Password"
                    : ""
            }
            onChange={(e) => {
              setUserState((prevState) => ({
                ...prevState,
                password: e.target.value,
              }));
            }}
            onBlur={() =>setUserState((prevState) => ({ ...prevState, touchedPassword: true }))}
          />

          <div className="remember-forgot">
            <label className="custom-checkbox">
              <input
                name="dummy"
                type="checkbox"
                onChange={(e) =>
                  setUserState((prevState) => ({
                    ...prevState,
                    remember: e.target.checked,
                  }))
                }
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            <ForgetPassword />
            <ForgetUsername/>
          </div>
          <Button
            data-testid="login-btn"
            variant="contained"
            sx={{
              width: "100%",
              marginTop: "10px",
              padding: "10px",
              borderRadius: "25px",
              backgroundColor: "#FF5700",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
            startIcon={<FiLogIn />}
            disabled={!userState.validUser && !userState.validEmail || !userState.validPassword}
            type="submit"
          >
            Login
          </Button>


          <Button
            id="googlebtn"
            onClick={() => googleLogin()}
            variant="contained"
            color="primary"
            sx={{ width: "100%", marginTop: "10px", padding: "10px" , borderRadius: "25px"}}
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
