import React from "react";
import "./LoginForm.css";
import { FaUserAstronaut, FaFacebook, FaGoogle } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import { MdAlternateEmail } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";
import {
  validateSignup,
  // validateCapcha,
} from "../features/authentication/validate";

function Signup() {
  const [errors, setErrors] = React.useState({});
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [captcha, setCaptcha] = React.useState("");
  const [touched, setTouched] = React.useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateSignup({ username, password, email, confirmPassword }));
    if (errors.username) {
      document.getElementById("username-field").classList.add("error-outline");
    } else {
      document
        .getElementById("username-field")
        .classList.remove("error-outline");
    }
    if (errors.password) {
      document.getElementById("password-field").classList.add("error-outline");
    } else {
      document
        .getElementById("password-field")
        .classList.remove("error-outline");
    }
    if (errors.email) {
      document.getElementById("email-field").classList.add("error-outline");
    } else {
      document.getElementById("email-field").classList.remove("error-outline");
    }
    if (errors.confirmPassword) {
      document
        .getElementById("confirmPassword-field")
        .classList.add("error-outline");
    } else {
      document
        .getElementById("confirmPassword-field")
        .classList.remove("error-outline");
    }
    setTouched({
      ...touched,
      ...Object.keys({ username, password, email, confirmPassword }).reduce(
        (touched, key) => {
          touched[key] = true;
          return touched;
        },
        {}
      ),
    });
  };

  return (
    <div className="wrapper">
      <div className="background-div">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <div className="input-field">
            <input type="text" onChange={(e) => setEmail(e.target.value)} />{" "}
            <label className="placeholder-label">Email</label>
            <MdAlternateEmail className="icon" />
          </div>

          <div className="input-field">
            <input type="text" onChange={(e) => setUsername(e.target.value)} />{" "}
            <label className="placeholder-label">Username</label>
            <FaUserAstronaut className="icon" />
          </div>

          <div className="input-field">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="placeholder-label">Password</label>
            <TbPasswordFingerprint className="icon" />
          </div>

          <div className="input-field">
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="placeholder-label">Confirm Password</label>
            <TbPasswordFingerprint className="icon" />
          </div>
          <div className="captcha">
            <ReCAPTCHA
              sitekey="6LfwE4opAAAAAIroaJa6YdxlNtZiD7-OpS-QOoH0"
              onChange={(e) => {
                setCaptcha(e.target.value);
                console.log(e.target.current.getValue);
              }}
            />
          </div>
          <button type="submit">Signup</button>
          <button className="facebook" type="submit">
            {" "}
            <FaFacebook className="social-icon" />
            Signup with Facebook
          </button>
          <button className="google" type="submit">
            <FaGoogle className="social-icon" />
            Signup with Google
          </button>
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
