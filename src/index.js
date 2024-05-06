import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="500020411396-l7soq48qpasrds9ipgo5nff5656i0ial.apps.googleusercontent.com">
  {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
);

reportWebVitals();
