import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchFromCart } from "../action/cartAction";
export const Checkout = ({
  auth: { userInfo, isAuthenticated },
  fetchFromCart,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      //clear cart data on the local storage when user places/checkouts the order
      localStorage.removeItem("cart");
      //update the cart
      fetchFromCart();
    }
  }, [fetchFromCart, isAuthenticated]);
  return (
    <div className="mt-5 green-box me-5 ms-5 mb-5">
      <div className="display-6">
        Thank you for placing an order.
        <br /> <br />
        Your order will be delivered shortly
      </div>

      <div className="mt-5 mb-5">
        <h3>Delivery address:</h3>
        <hr />
        <div className="lead mb-5">{userInfo && userInfo.address}</div>
      </div>
    </div>
  );
};

Checkout.propTypes = {
  auth: PropTypes.object.isRequired,
  fetchFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

const mapDispatchToProps = { fetchFromCart };

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
