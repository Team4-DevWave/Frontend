import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';
import Settings from './pages/Settings';

function App() {
  return (
    //hello snow!
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<div>Home</div>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<div>Contact</div>} />
      <Route path="/settings" element={<Settings/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
