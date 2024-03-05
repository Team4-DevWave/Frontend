import React from "react";
import "./LoginForm.css";
import { FaUserAstronaut, FaFacebook, FaGoogle } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import { validateLogin } from "../features/authentication/validate";
import bcrypt from "bcryptjs-react";

function Login() {
  const [errors, setErrors] = React.useState({});
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [touched, setTouched] = React.useState({});
  const [remember, setRemember] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateLogin({ username, password }));
    if (errors.username){
      document.getElementById("username-field").classList.add("error-outline");
    }
    else{
      document.getElementById("username-field").classList.remove("error-outline");
    }
    if (errors.password){
      document.getElementById("password-field").classList.add("error-outline");
    }
    else{
      document.getElementById("password-field").classList.remove("error-outline");
    }
    setTouched({
      ...touched,
      ...Object.keys({ username, password }).reduce((touched, key) => {
        touched[key] = true;
        return touched;
      }, {}),
    });
  };

  return (
    <div className="wrapper">
      <div className="background-div">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="input-field">
            <input id="username-field"
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
                e.target.classList.toggle("has-value", e.target.value !== "");
              }}
            />{" "}
            <label className="placeholder-label">Username</label>
            {errors.username && touched.username && (
              <div className="error">{errors.username}</div>
            )}
            <FaUserAstronaut className="icon" />
          </div>

          <div className="input-field">
            <input id="password-field"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                e.target.classList.toggle("has-value", e.target.value !== "");
              }}
            />
            <label className="placeholder-label">Password</label>
            {errors.password && touched.password && (
              <div className="error">{errors.password}</div>
            )}
            <TbPasswordFingerprint className="icon" />
          </div>

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
            <a href="/">Forgot Password?</a>
          </div>
          <button type="submit">Login</button>
          <button className="facebook" type="submit">
            {" "}
            <FaFacebook className="social-icon" />
            Login with Facebook
          </button>
          <button className="google" type="submit">
            <FaGoogle className="social-icon" />
            Login with Google
          </button>
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
