import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import store from "../../../redux/store";
import { fetchFromCart } from "../../cart/action/cartAction";
import { getFood, deleteFood } from "../actions/foodAction";
import { addToCart, removeFromCart } from "../../cart/action/cartAction";
export const FoodDetails = ({
  food: { currentFood },
  auth: { userInfo },
  cart,
  getFood,
  deleteFood,
}) => {
  const { id } = useParams();
  useEffect(() => {
    //fetch food based on id in the url
    if (!currentFood) {
      getFood(id);
      fetchFromCart();
    }
  }, [currentFood, id, getFood]);

  //check whether food item is in cart or not
  const [inCart, setInCart] = useState(
    cart.filter((item) => item.id === currentFood.id).length > 0 ? true : false
  );

  //if food id is invalid
  if (!currentFood) {
    return (
      <div
        className="text-center"
        style={{ marginBottom: "200px", marginTop: "100px" }}
      >
        <h1 className="text text-center">Food doesn't exist</h1>
      </div>
    );
  }
  const isAdmin =
    userInfo && userInfo.roles && userInfo.roles.includes("ROLE_ADMIN")
      ? true
      : false;

  return (
    <div className="row food-details-container m-5">
      <div className="col">
        <img
          src={currentFood.foodPic}
          alt={currentFood.foodName}
          className="img-thumbnail"
          style={{ maxHeight: "unset", maxWidth: "unset" }}
        />
      </div>
      <div className="col">
        <h3>{currentFood.foodName}</h3>
        <h1>₹ {currentFood.foodCost}</h1>
        <div>{currentFood.description}</div>

        {isAdmin ? (
          // if admin, show the options to delete and edit food
          <div className="button-container mt-5">
            <Link
              className="btn btn-primary m-3"
              to={`/admin/editFood/${currentFood.id}`}
            >
              <i className="bi bi-pencil-square"></i>
              Edit food
            </Link>
            <Link
              to="/food"
              className="btn btn-danger m-3"
              onClick={(e) => {
                deleteFood(currentFood.id);
              }}
            >
              <i className="bi bi-trash"></i>
              Delete food
            </Link>
          </div>
        ) : (
          //if customer or non-authenticated show add to cart/remove from cart
          <button
            className={`btn btn-${inCart ? "danger" : "info"} mt-5`}
            onClick={(e) => {
              if (e.target.innerText === "Add to cart") {
                store.dispatch(addToCart(currentFood));
              } else {
                store.dispatch(removeFromCart(currentFood.id));
              }
              setInCart(!inCart);
            }}
          >
            {inCart ? "Remove from cart" : "Add to cart"}
          </button>
        )}
      </div>
    </div>
  );
};

FoodDetails.propTypes = {
  auth: PropTypes.object.isRequired,
  food: PropTypes.object.isRequired,
  deleteFood: PropTypes.func.isRequired,
  getFood: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  food: state.food,
  cart: state.cart,
});

const mapDispatchToProps = { getFood, deleteFood };

export default connect(mapStateToProps, mapDispatchToProps)(FoodDetails);
