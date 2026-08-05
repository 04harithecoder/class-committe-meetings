import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MemberLogin from "./components/MemberLogin";
import AdminLogin from "./components/AdminLogin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MemberLogin />} />
        <Route path="/admin" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}