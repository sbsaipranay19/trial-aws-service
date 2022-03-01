import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
export default AuthRouter;
