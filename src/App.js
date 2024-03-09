import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login';

import Settings from './pages/Settings/Settings';
import Signup from './pages/Signup'
import Message from './pages/messages/inbox.js'


function App() {
  return (
    //hello snow!
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<div>Home</div>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/settings" element={<Settings/>} />
        <Route path="/messages" element={<Message/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
