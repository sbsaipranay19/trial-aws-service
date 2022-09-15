import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { updateProfie, deleteAccount } from "../../auth/action/authAction";
import { setAlert } from "../../core/actions/alertAction";
import store from "../../../redux/store";

//component to update or delete customer profile
export const Profile = ({
  auth: { userInfo },
  updateProfie,
  deleteAccount,
}) => {
  //loading data with existing information
  const [formData, setFormData] = useState({
    name: userInfo.name,
    email: userInfo.email,
    password: "",
    password2: "",
    address: userInfo.address,
  });
  const { name, email, password, password2, address } = formData;
  // console.log("State:", JSON.stringify(formData));

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password === password2) {
      updateProfie({ name, email, password, address }, userInfo.id);
    } else {
      store.dispatch(setAlert("Passwords did not match", "danger"));
    }
  };

  return (
    <div className="register">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <p className="lead text-center">Edit your profile</p>
            <form>
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
              <div className="form-group mt-2 mb-2">
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
              <div className="form-group mt-2 mb-2">
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
              <div className="form-group mt-2 mb-2">
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
              <div className="form-group mt-2 mb-2">
                <textarea
                  type="textarea"
                  className="form-control form-control-lg"
                  placeholder="Enter your address"
                  name="address"
                  value={address}
                  onChange={onChange}
                  required
                  rows="4"
                  cols="50"
                />
              </div>

              <div className="text text-center">
                <button
                  type="submit"
                  className="btn btn-info btn-block mt-4 me-2 ms-2"
                  onClick={onSubmit}
                >
                  Update
                </button>
              </div>
            </form>
            <div className="text text-center">
              <Link
                to="/auth/login"
                className="btn btn-danger btn-block mt-4 me-2 ms-2"
                onClick={(e) => {
                  deleteAccount(userInfo.id);
                }}
              >
                Delete Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  isAuthenticated: PropTypes.bool,
  updateProfie: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { updateProfie, deleteAccount };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
