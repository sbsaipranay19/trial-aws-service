import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../auth/action/authAction";

//menu items for admin
const adminOptions = [
  {
    url: "/admin/users",
    menu: "Users",
  },
  {
    url: "/admin/addFood",
    menu: "Add Food",
  },
];

//menu items for customer
const customerOptions = [
  {
    url: "/cart",
    menu: "Cart",
  },
  {
    url: "/customer/profile",
    menu: "Edit Profile",
  },
];

//menu items for non-authenticated users
const unAuthOptions = [
  {
    url: "/cart",
    menu: "Cart",
  },
  {
    url: "/auth/signup",
    menu: "Sign up",
  },
  {
    url: "/auth/login",
    menu: "Login",
  },
];

export const Header = ({
  auth: { userInfo, isAuthenticated },
  logout,
  cart,
}) => {
  //checking whether the user is admin or not
  const isAdmin =
    userInfo && userInfo.roles && userInfo.roles.includes("ROLE_ADMIN")
      ? true
      : false;

  //loading options based on authenication and role
  const options = isAuthenticated
    ? isAdmin
      ? adminOptions
      : customerOptions
    : unAuthOptions;
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <p className="navbar-brand">
          {isAuthenticated
            ? "Welcome " + userInfo.name
            : "Food Delivery Connector"}
        </p>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <div className="d-flex">
            <Link className="btn btn-primary me-2" to="/" key="home">
              Home
            </Link>
            {options &&
              options.map((option) => (
                <Link
                  className="btn btn-primary me-2"
                  to={option.url}
                  key={option.menu}
                >
                  {option.menu === "Cart"
                    ? `Cart (${cart.length})` /* shows item count besides the cart menu */
                    : option.menu}
                </Link>
              ))}
            {isAuthenticated && (
              <Link className="btn btn-primary me-2" to="/" onClick={logout}>
                Logout
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

Header.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  cart: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart,
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Header);
