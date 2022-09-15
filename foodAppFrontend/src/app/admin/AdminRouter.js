import React from "react";
import { Route, Routes } from "react-router-dom";
import FoodForm from "../food/component/FoodForm";
import ViewUsers from "./component/ViewUsers";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/users" element={<ViewUsers />} />
      <Route path="/addFood" element={<FoodForm />} />
      <Route path="/editFood/:id" element={<FoodForm />} />
    </Routes>
  );
};

export default AdminRouter;
