import React from "react";
import { Route, Routes } from "react-router-dom";
import FoodDashboard from "./component/FoodDashboard";
import FoodDetails from "./component/FoodDetails";
const FoodRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<FoodDashboard />} />
      <Route path="/:id" element={<FoodDetails />} />
    </Routes>
  );
};
export default FoodRouter;
