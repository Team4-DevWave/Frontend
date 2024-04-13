import React, { useEffect } from "react";
import "./LoginForm.css";
import { FaUserAstronaut, FaFacebook, FaGoogle } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import { MdAlternateEmail } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";
import { preferenceOptions } from "../utils/preferences";
import useCountry from "../hooks/useCountry";
import useAvailableEmail from "../hooks/useAvailableEmail";
import SelectGender from "../components/SelectGender";
import SelectInterests from "../components/SelectInterests";
import SelectUsername from "../components/SelectUsername";
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

  const [stage, setStage] = React.useState(1);

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

  const available = useAvailableEmail(userState.email);

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
    
    console.log(userState);
    axios
      .post(
        "https://www.threadit.tech/api/v1/users/signup",
        {
          username: userState.username,
          password: userState.password,
          email: userState.email,
          passwordConfirm: userState.confirmPassword,
          country: country,
          gender: userState.gender,
          interests: preferences,
        },
        config
      )
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

  useEffect(() => {
    if(stage===5){
      handleSubmit();
    }
  }, [stage]);


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
      {stage === 1 && (
        <form className="login-form" >
          <h2>Signup</h2>
          <TextField
            data-testid="email"
            InputProps={{
              style: { borderRadius: 25 },
              endAdornment: <MdAlternateEmail />,
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Email"
            type="text"
            error={
              (!userState.email && userState.touchedEmail) ||
              (userState.touchedEmail && !userState.validEmail)
              || (!available && userState.touchedEmail)
            }
            helperText={
              !userState.email && userState.touchedEmail
                ? "Email is required"
                : "" || (!userState.validEmail && userState.touchedEmail)
                  ? "Invalid Email"
                  : "" ||(!available && userState.touchedEmail)
                    ? "Email is already taken"
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
            data-testid="password"
            InputProps={{
              style: { borderRadius: 25 },
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
              style: { borderRadius: 25 },
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
            type= {showPass.showConfirmPassword ? "text" : "password"}
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
           onClick={ () => setStage(2) }
            data-testid="signup-btn"
            variant="contained"
            sx={{
              width: "100%",
              borderRadius: "25px",
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#FF5700",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
            startIcon={<FiLogIn />}
            disabled={
         
              !userState.validPassword ||
              !userState.validEmail ||
              !available ||
              !userState.validConfirmPassword ||
              !userState.captcha
            }
            type="submit"
          >
            Signup
          </Button>

          <Button
            id="googlebtn"
            onClick={() => googleLogin()}
            variant="contained"
            color="primary"
            sx={{
              width: "100%",
              marginTop: "10px",
              padding: "10px",
              borderRadius: "25px",
            }}
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
      )}
      {stage === 2 && (
        <SelectUsername
          stage={stage}
          setStage={setStage}
          username={userState.username}
          setUsername={(username) =>
            setUserState((prevState) => ({ ...prevState, username }))
          }
        />
      )}
      {stage === 3 && (
        <SelectGender
          stage={stage}
          setStage={setStage}
          gender={userState.gender}
          setGender={(gender) =>
            setUserState((prevState) => ({ ...prevState, gender }))
          }
        />
      )}
      {stage === 4 && <SelectInterests
         stage={stage}
         setStage={setStage}
         preferences={preferences}
         setPreferences={setPreferences}
      />}
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
