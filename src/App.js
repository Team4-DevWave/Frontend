/* global google */
import "./App.css";
import React, { useState, useRef, useEffect } from 'react';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Settings from "./pages/Settings/Settings";
import Signup from "./pages/Signup";
import Message from "./pages/messages/inbox.js";
import Notification from "./pages/Notification/Notificaton.js";
import Home from "./pages/Home";
import CreatePost from "./components/Create_Post/Nav.js";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { lightTheme, darkTheme } from "./utils/themes";
import routes from "./utils/routes";

function App() {

  return (
    //hello snow!
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/messages" element={<Message />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/CreatePost" element={<CreatePost />} />


      </Routes>
    </BrowserRouter>
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Routes>
          {Object.entries(routes).map(([path, element]) => (
            <Route key={path} path={path} element={element()} />
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
