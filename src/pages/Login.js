import React, { useEffect } from "react";
import "./LoginForm.css";
import { FaUserAstronaut, FaFacebook, FaGoogle } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import ForgetPassword from "../components/ForgetPassword";
import { TextField, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FiLogIn } from "react-icons/fi";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { LoginSocialFacebook } from "reactjs-social-login";
import axios from "axios";
import { useNavigate } from "react-router";

function Login() {
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
      .post("http://localhost:8080/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        if(response.status === 200) {
          console.log("User is found");
          localStorage.setItem("token", response.data);
          navigate("/");
        }else{
          console.log("User is not found");
          setAttempted(true);
        }
        
        console.log(response);
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
              (touchedPassword && !validPassword)
              || attempted
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
