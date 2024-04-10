import React, { useEffect } from "react";
import "./LoginForm.css";
import { FaUserAstronaut, FaFacebook, FaGoogle } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import { MdAlternateEmail } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";
import { preferenceOptions } from "../utils/preferences";
import useCountry from "../hooks/useCountry";
import {
  TextField,
  Button,
  InputLabel,
  RadioGroup,
  Radio,
  Chip,
  Box,
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
  FormControlLabel,
} from "@mui/material";
import { FiLogIn } from "react-icons/fi";
import { LoginSocialFacebook } from "reactjs-social-login";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import PropTypes from "prop-types";

function Signup() {
  const country = useCountry();

  const [showPass, setShowPass] = React.useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const [preferences, setPreferences] = React.useState([]);

  const [userState, setUserState] = React.useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    gender: "",
    captcha: null,
    validUser: false,
    validPassword: false,
    validEmail: false,
    validConfirmPassword: false,
    attempted: false,
    touchedUser: false,
    touchedPassword: false,
    touchedEmail: false,
    touchedConfirmPassword: false,
  });

  useEffect(() => {
    setUserState((prevState) => ({
      ...prevState,
      validUser: prevState.username.match(/^[a-zA-Z0-9_]{3,16}$/),
      validEmail: prevState.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i),
      validPassword: prevState.password.match(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      ),
      validConfirmPassword: prevState.confirmPassword === prevState.password,
    }));
  }, [
    userState.username,
    userState.password,
    userState.email,
    userState.confirmPassword,
  ]);

  let bearerToken = "";

  const config = {
    headers: { Authorization: `Bearer ${bearerToken}` },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userState);
    axios
      .post("http://localhost:8000/api/v1/users/signup", {
        username: userState.username,
        password: userState.password,
        email: userState.email,
        passwordConfirm: userState.confirmPassword,
        country: country,
        gender: userState.gender,
        interests: preferences,
      },config)
      .then((response) => {
        if (response.status === 201) {
          console.log("User is created");
          const token = response.data.token;
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          localStorage.setItem("username", response.data.username);
          window.location.href = "/";
        } else {
          console.log("User is not created");
          setUserState((prevState) => ({ ...prevState, attempted: true }));
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setUserState((prevState) => ({ ...prevState, attempted: true }));
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
  const handleGenderChange = (event) => {
    setUserState((prevState) => ({ ...prevState, gender: event.target.value }));
  };
  const handlePreferences = (event) => {
    setPreferences(event.target.value);
  };
  return (
    <div className="wrapper">
      <div className="background-div">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <TextField
            data-testid="email"
            InputProps={{
              endAdornment: <MdAlternateEmail />,
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Email"
            type="text"
            error={
              (!userState.email && userState.touchedEmail) ||
              (userState.touchedEmail && !userState.validEmail)
            }
            helperText={
              !userState.email && userState.touchedEmail
                ? "Email is required"
                : "" || (!userState.validEmail && userState.touchedEmail)
                  ? "Invalid Email"
                  : ""
            }
            onChange={(e) => {
              setUserState((prevState) => ({
                ...prevState,
                email: e.target.value,
              }));
            }}
            onBlur={() =>
              setUserState((prevState) => ({
                ...prevState,
                touchedEmail: true,
              }))
            }
          />

          <TextField
            data-testid="username"
            InputProps={{
              endAdornment: <FaUserAstronaut />,
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Username"
            type="text"
            error={
              (!userState.username && userState.touchedUser) ||
              userState.attempted
            }
            helperText={
              !userState.username && userState.touchedUser
                ? "Username is required"
                : "" || userState.attempted
                  ? "Username already exists"
                  : ""
            }
            onChange={(e) => {
              setUserState((prevState) => ({
                ...prevState,
                username: e.target.value,
              }));
            }}
            onBlur={() =>
              setUserState((prevState) => ({ ...prevState, touchedUser: true }))
            }
          />

          <TextField
            data-testid="password"
            InputProps={{
              endAdornment: (
                <TbPasswordFingerprint
                  onClick={() =>
                    setShowPass((prevState) => ({
                      ...prevState,
                      showPassword: !prevState.showPassword,
                    }))
                  }
                />
              ),
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Password"
            type={showPass.showPassword ? "text" : "password"}
            error={!userState.password && userState.touchedPassword}
            helperText={
              !userState.password && userState.touchedPassword
                ? "Password is required"
                : ""
            }
            onChange={(e) => {
              setUserState((prevState) => ({
                ...prevState,
                password: e.target.value,
              }));
            }}
            onBlur={() =>
              setUserState((prevState) => ({
                ...prevState,
                touchedPassword: true,
              }))
            }
          />

          <TextField
            data-testid="confirm-password"
            InputProps={{
              endAdornment: (
                <TbPasswordFingerprint
                  onClick={() => {
                    setShowPass((prevState) => ({
                      ...prevState,
                      showConfirmPassword: !prevState.showConfirmPassword,
                    }));
                  }}
                />
              ),
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Confirm Password"
            type="password"
            error={
              (!userState.confirmPassword &&
                userState.touchedConfirmPassword) ||
              (userState.password !== userState.confirmPassword &&
                userState.touchedConfirmPassword)
            }
            helperText={
              (!userState.confirmPassword &&
                userState.touchedConfirmPassword) ||
              (userState.password !== userState.confirmPassword &&
                userState.touchedConfirmPassword)
                ? "Passwords do not match"
                : ""
            }
            onChange={(e) => {
              setUserState((prevState) => ({
                ...prevState,
                confirmPassword: e.target.value,
              }));
            }}
            onBlur={() =>
              setUserState((prevState) => ({
                ...prevState,
                touchedConfirmPassword: true,
              }))
            }
          />
          <InputLabel required>Gender</InputLabel>
          <RadioGroup
            row
            value={userState.gender}
            onChange={handleGenderChange}
          >
            <FormControlLabel value="man" control={<Radio />} label="Male" />
            <FormControlLabel
              value="woman"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="Prefer not to say"
            />
          </RadioGroup>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-chip-label">Intersests</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={preferences}
              onChange={handlePreferences}
              input={
                <OutlinedInput id="select-multiple-chip" label="Preferences" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {preferenceOptions.map((preference) => (
                <MenuItem key={preference} value={preference}>
                  {preference}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="captcha">
            <ReCAPTCHA
              data-testid="captcha"
              sitekey="6LfwE4opAAAAAIroaJa6YdxlNtZiD7-OpS-QOoH0"
              onChange={(value) => {
                setUserState((prevState) => ({ ...prevState, captcha: value }));
                console.log(value);
              }}
            />
          </div>
          <Button
            data-testid="signup-btn"
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
            disabled={
              !userState.validUser ||
              !userState.validPassword ||
              !userState.validEmail ||
              !userState.gender ||
              !userState.validConfirmPassword ||
              !userState.captcha
            }
            type="submit"
          >
            Signup
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
              Signup with Facebook
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
            Signup with Google
          </Button>
          <div className="register-link">
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;

Signup.propTypes = {
  /** mandatory email, displays error message if touched and left empty */
  email: PropTypes.string,
  /** mandatory username, displays error message if touched and left empty */
  username: PropTypes.string,
  /** mandatory password, displays error message if touched and left empty */
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
  /** Checks if email is valid */
  validEmail: PropTypes.bool,
  /** Checks if confirm password is valid */
  validConfirmPassword: PropTypes.bool,
  /** Captcha must be solved to enable user creation */
  captcha: PropTypes.string,

  /** Handles form submission
   * username must not already exist in database
   * email must not already exist in database
   * password must be at least 8 characters long and contain at least one letter and one number
   * email must be in valid email format
   * captcha must be solved
   */
  handleSubmit: PropTypes.func,
  /** Handles google login */
  googleLogin: PropTypes.func,

  /** Handles navigation to home upon successful login*/
  navigate: PropTypes.func,
  /** Material UI theme */
  theme: PropTypes.object,
};
