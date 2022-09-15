import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { register } from "../action/authAction";
import { setAlert } from "../../core/actions/alertAction";
import store from "../../../redux/store";
// rfcreduxp
export const Register = ({ auth: { isAuthenticated }, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    houseNo: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const {
    name,
    email,
    password,
    password2,
    houseNo,
    street,
    city,
    state,
    zipCode,
  } = formData;
  // console.log("State:", JSON.stringify(formData));

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // adding the values separated by comma to get complete address
    var address =
      houseNo + ", " + street + ", " + city + ", " + state + ", " + zipCode;
    if (password === password2) {
      register({ name, email, password, address });
    } else {
      //alert to show password does not match
      store.dispatch(setAlert("Passwords did not match", "danger"));
    }
  };
  //redirect user to food dashboard page if user is authenticated
  if (isAuthenticated) {
    return <Navigate to="/food" />;
  }

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p className="lead text-center">Create your account</p>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="left">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="House No"
                    name="houseNo"
                    value={houseNo}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="right">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Street"
                    name="street"
                    value={street}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="left">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="City"
                    name="city"
                    value={city}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="right">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="State"
                    name="state"
                    value={state}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Zip Code"
                  name="zipCode"
                  value={zipCode}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <input type="checkbox" required />
                <small className="form-text text-muted">
                  I agree to the <Link to="#"> terms and conditions </Link>
                  and <Link to="#">privacy policy</Link>
                </small>
              </div>

              <input type="submit" className="btn btn-info btn-block mt-4" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { register };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
