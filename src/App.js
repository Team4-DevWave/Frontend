import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';

function App() {
  return (
    //hello snow!
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<div>Home</div>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<div>Contact</div>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
