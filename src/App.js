import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Settings from "./pages/Settings/Settings";
import Signup from "./pages/Signup";
import Message from "./pages/messages/inbox.js";
import Notification from "./pages/Notification/Notificaton.js";
import Home from "./pages/Home";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UserPage from "./pages/UserPage";
import CssBaseline from '@mui/material/CssBaseline';
import ResetCredentials from "./pages/ResetCredentials";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f44336',
    },
    secondary: {
      main: '#3f51b5',
    },
  },
});

function App() {
  return (
   
    <ThemeProvider theme={lightTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/messages" element={<Message />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/reset" element={<ResetCredentials />} />
        <Route path="/Notification" element={<Notification />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
