/* global google */
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
import { lightTheme, darkTheme } from "./utils/themes";
import routes from "./utils/routes";

function App() {
  return (
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
