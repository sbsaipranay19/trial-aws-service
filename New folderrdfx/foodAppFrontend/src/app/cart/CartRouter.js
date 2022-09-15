import React from "react";
import { Route, Routes } from "react-router-dom";
import CustomerAuthorization from "../customer/component/CustomerAuthorization";
import Checkout from "./component/Checkout";
import ViewCart from "./component/ViewCart";

const CartRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ViewCart />} />
      {/* Making checkout option available to only customers */}
      <Route
        path="/checkout"
        element={<CustomerAuthorization Component={Checkout} />}
      />
    </Routes>
  );
};

export default CartRouter;
