import React from "react";

function Login() {
  return (
    <div>
      <div className="center">
        <div className="form-container">
          <h1>Welcome To Threaddit</h1>
          <form className="login-form-light">
            <label>
              <strong>Username or Email</strong>
            </label>
            <input
              className="form-text-light"
              type="text"
              onChange={console.log("Hi")}
            />
            <label>
              <strong>Password</strong>
            </label>
            <input
              className="form-text-light"
              type="password"
              onChange={console.log("Hi")}
            />
            <button className="submit-button-light" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
