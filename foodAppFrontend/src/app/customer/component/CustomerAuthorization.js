import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { setAlert } from "../../core/actions/alertAction";


//pre authorization check that user is customer but not admin/non-auntenticated user
export const CustomerAuthorization = ({
  auth: { isAuthenticated, userInfo, isLoading },
  Component,
  setAlert,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    const isAdmin =
      userInfo && userInfo.roles.includes("ROLE_ADMIN") ? true : false;
    if (!isAuthenticated) {
      setAlert("Login as customer to access the page!", "danger");
      navigate("/auth/login");
    } else if (isAdmin) {
      setAlert("Admins cannot access this page, Login as user!", "danger");
      navigate("/food");
    }
  }, [isAuthenticated, navigate, setAlert, userInfo, isLoading]);
  if (isAuthenticated) return <Component />;
  return <Navigate to="/food"></Navigate>;
};

CustomerAuthorization.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { setAlert };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerAuthorization);
