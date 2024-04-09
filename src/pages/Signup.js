import React, { useEffect } from "react";
import "./LoginForm.css";
import { FaUserAstronaut, FaFacebook, FaGoogle } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import { MdAlternateEmail } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";
import { preferenceOptions } from "../utils/preferences";
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
  const [errors, setErrors] = React.useState({});
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [captcha, setCaptcha] = React.useState(null);
  const [validUser, setValidUser] = React.useState(false);
  const [validPassword, setValidPassword] = React.useState(false);
  const [validEmail, setValidEmail] = React.useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = React.useState(false);
  const [country, setCountry] = React.useState("");
  const [preferences, setPreferences] = React.useState([]);

  const [attempted, setAttempted] = React.useState(false);



  useEffect(() => {
    setValidUser(username.match(/^[a-zA-Z0-9_]{3,16}$/));
    setValidEmail(email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
    setValidPassword(password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/));
    setValidConfirmPassword(password === confirmPassword);
  }, [username, password, email, confirmPassword]);

  useEffect(() => {
    const getCountry = async () => {
      const result = await axios.get("https://ipapi.co/json/");
      console.log("Country",result.data.country_name);
      setCountry(result.data.country_name);
     
    };
    getCountry();
  }, []);

  const [touchedUser, setTouchedUser] = React.useState(false);
  const [touchedPassword, setTouchedPassword] = React.useState(false);
  const [touchedEmail, setTouchedEmail] = React.useState(false);
  const [touchedConfirmPassword, setTouchedConfirmPassword] =
    React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/v1/users/signup", {
        username: username,
        password: password,
        email: email,
        passwordConfirm: confirmPassword,
        country: country,
        gender: gender,
        interests: preferences,
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("User is created");
          const token = response.data.token;
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          window.location.href = "/login";
        } else {
          console.log("User is not created");
          setAttempted(true);
        }
        console.log(response);
      }).catch((error) => {
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
  const handleGenderChange = (event) => {
    setGender(event.target.value);
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
            error={(!email && touchedEmail) || (touchedEmail && !validEmail)}
            helperText={
              !email && touchedEmail
                ? "Email is required"
                : "" || (!validEmail && touchedEmail)
                  ? "Invalid Email"
                  : ""
            }
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            onBlur={() => setTouchedEmail(true)}
          />

          <TextField
            data-testid="username"
            InputProps={{
              endAdornment: <FaUserAstronaut />,
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Username"
            type="text"
            error={(!username && touchedUser) || attempted}
            helperText={
              !username && touchedUser
                ? "Username is required"
                : "" || attempted
                  ? "Username already exists"
                  : ""
            }
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onBlur={() => setTouchedUser(true)}
          />

          <TextField
            data-testid="password"
            InputProps={{
              endAdornment: <TbPasswordFingerprint />,
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Password"
            type="password"
            error={!password && touchedPassword}
            helperText={
              !password && touchedPassword ? "Password is required" : ""
            }
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onBlur={() => setTouchedPassword(true)}
          />

          <TextField
            data-testid="confirm-password"
            InputProps={{
              endAdornment: <TbPasswordFingerprint />,
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Confirm Password"
            type="password"
            error={
              (!confirmPassword && touchedConfirmPassword) ||
              (password !== confirmPassword && touchedConfirmPassword)
            }
            helperText={
              (!confirmPassword && touchedConfirmPassword) ||
              (password !== confirmPassword && touchedConfirmPassword)
                ? "Passwords do not match"
                : ""
            }
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            onBlur={() => setTouchedConfirmPassword(true)}
          />
          <InputLabel required>Gender</InputLabel>
          <RadioGroup row value={gender} onChange={handleGenderChange}>
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
              input={<OutlinedInput id="select-multiple-chip" label="Preferences" />}
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
                setCaptcha(value);
                console.log(value);
              }}
            />
            {errors.captcha && <div className="error">{errors.captcha}</div>}
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
              !validUser ||
              !validPassword ||
              !validEmail ||
              !gender ||
              !validConfirmPassword ||
              !captcha
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
