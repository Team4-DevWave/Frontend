import React from "react";
import "./LoginForm.css";
import { FaUserAstronaut , FaFacebook, FaGoogle} from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import { MdAlternateEmail } from "react-icons/md";
import ReCAPTCHA from "react-google-recaptcha";

function Signup() {
  return (
    <div className="wrapper">
      <div className="background-div">
        <form className="login-form">
          <h2>Signup</h2>
          <div className="input-field">
            <input type="text" />{" "}
            <label className="placeholder-label">Email</label>
            <MdAlternateEmail className="icon" />
          </div>

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

          <div className="input-field">
            <input type="password" />
            <label className="placeholder-label">Confirm Password</label>
            <TbPasswordFingerprint className="icon" />
          </div>
          <div className="captcha">
          <ReCAPTCHA sitekey="6LfwE4opAAAAAIroaJa6YdxlNtZiD7-OpS-QOoH0" onChange={console.log("hi")} />
          </div>
          <button type="submit">Signup</button>
          <button className="facebook" type="submit"> <FaFacebook className="social-icon"/>Signup with Facebook</button>
          <button className="google" type="submit"><FaGoogle className="social-icon"/>Signup with Google</button>
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
