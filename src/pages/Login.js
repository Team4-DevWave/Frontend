import React from "react";

function Login() {
  return (
    <div className="container-form-light">
      <div className="row">
        <div className="col-md-6 mx-auto mt-5">
        <form className="d-flex flex-column justify-content-center vh-100">
            <h1 className="h3 mb-3 fw-normal text-center">Threaddit Login</h1>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="text"
                    className="form-control"
                    name="username"
                    placeholder="Enter username"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                />
            </div>
            <button type="submit"
            className="btn btn-lg btn-block ">
            Log In
            </button>
        </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
