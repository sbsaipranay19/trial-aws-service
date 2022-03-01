import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchFromCart, removeFromCart } from "../action/cartAction";
export const ViewCart = ({ cart, fetchFromCart, removeFromCart }) => {
  let cartTotal = 0;
  //iterating over the cart to find the total amount
  cart.forEach((item) => {
    cartTotal += item.foodCost;
  });
  useEffect(() => {
    fetchFromCart();
  }, [fetchFromCart]);
  return (
    <div className="view-cart-container m-5">
      <h3>Your cart content</h3>
      <table className="table">
        <thead>
          <tr>
            <td>Sl no</td>
            <td>Food Pic</td>
            <td>Food name</td>
            <td style={{ textAlign: "right", paddingRight: "50px" }}>
              {" "}
              Food cost{" "}
            </td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {/* iterating over cart and create a row for each food item  */}
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={item.foodPic}
                  alt={item.foodName}
                  className="img-thumbnail"
                />
              </td>
              <td>{item.foodName}</td>
              <td align="right" style={{ paddingRight: "50px" }}>
                ₹ {item.foodCost}
              </td>

              <td
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => removeFromCart(item.id)}
              >
                <i className="bi bi-trash"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <b>Total Cost: ₹ {cartTotal}</b>
      <div className="mt-5 text-center text">
        {cart.length > 0 && (
          <Link to="../checkout" className="btn btn-primary mt-5">
            Checkout
          </Link>
        )}
      </div>
    </div>
  );
};

ViewCart.propTypes = {
  cart: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  fetchFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = { removeFromCart, fetchFromCart };

export default connect(mapStateToProps, mapDispatchToProps)(ViewCart);
