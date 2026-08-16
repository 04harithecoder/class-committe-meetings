import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoleLogin from "./components/RoleLogin";
import AdminLogin from "./components/AdminLogin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}