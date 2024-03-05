import React from "react";
import "./LoginForm.css";
import { FaUserAstronaut, FaFacebook, FaGoogle } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";

function Login() {
  return (
    <div className="wrapper">
      <div className="background-div">
        <form className="login-form">
          <h2>Login</h2>
          <div className="input-field">
            <input type="text" />{" "}
            <label className="placeholder-label">Username</label>
            <FaUserAstronaut className="icon" />
          </div>

          <div className="input-field">
            <input type="password" />
            <label className="placeholder-label">Password</label>
            <TbPasswordFingerprint className="icon" />
          </div>

          <div className="remember-forgot">
            <label class="custom-checkbox">
              <input name="dummy" type="checkbox" />
              <span class="checkmark"></span>
              Remember me
            </label>
            <a href="/">Forgot Password?</a>
          </div>
          <button type="submit">Login</button>
          <button className="facebook" type="submit"> <FaFacebook className="social-icon"/>Login with Facebook</button>
          <button className="google" type="submit"><FaGoogle className="social-icon"/>Login with Google</button>
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
