/* global google */
import "./App.css";
import React, { useState, useRef, useEffect } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import { ThemeProvider, createTheme } from "@mui/material/styles";
import { lightTheme, darkTheme } from "./utils/themes";
import routes from "./utils/routes";
//get current html theme


function App() {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }, []);
  return (
    
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {Object.entries(routes).map(([path, Component]) => (
            <Route key={path} path={path} element={<Component toggleTheme={toggleTheme} />} />
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
