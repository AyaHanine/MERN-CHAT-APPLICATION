import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChatContainer from "./components/ChatContainer";
import ChatInput from "./components/ChatInput";
import Contacts from "./components/Contacts";
import Logout from "./components/Logout";
import SetAvatar from "./components/SetAvatar";
import Welcome from "./components/Welcome";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<Chat />} />
        
        
        

        
      </Routes>
    </BrowserRouter>
  );
}
