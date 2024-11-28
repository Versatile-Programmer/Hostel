// import React from "react";
import {  Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateRequest from "./pages/CreateRequest";
import ViewRequests from "./pages/ViewRequest";
// import { ToastContainer } from 'react-toastify';


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-requests" element={<CreateRequest />} />
        <Route path="/my-requests" element={<ViewRequests />} />
      </Routes>

  );
};

export default App;
