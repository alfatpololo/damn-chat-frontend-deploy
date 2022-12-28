import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/login";
import Register from "../pages/register/register";
import ForgotPassword from "../pages/forgot-password/forgot-password";
import Chat from "../pages/chat/chat";
import CallHistory from "../pages/call-history/call-history";
import Profile from "../pages/profile/profile";
import Messanger from "../pages/messenger/messenger";
import EditProfile from "../pages/edit-profile/edit-profile";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/callhistory" element={<CallHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messanger" element={<Messanger />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
