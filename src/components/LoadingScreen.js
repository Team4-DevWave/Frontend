import React from "react";
import "./LoadingScreen.css";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingScreen() {
  return (
    <div className="loading-screen-light">
      <div style={{display:"flex",flexDirection:"column" ,alignItems:"center"}}> 
        <h1>
          <img
            src={process.env.PUBLIC_URL + "/images/threadditweb.png"}
            alt="threadit logo"
            height="40"
          />
        </h1>
        <CircularProgress />
      </div>
    </div>
  );
}
