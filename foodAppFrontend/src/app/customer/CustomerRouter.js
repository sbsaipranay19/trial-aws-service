import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./component/Profile";

const CustomerRouter = () => {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default CustomerRouter;
