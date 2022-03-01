import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getCustomers, deleteCustomer } from "../action/adminActions";

//JSX component to generate row for a user existance
const UserItem = ({ user, index, deleteCustomer }) => {
  return (
    <tr>
      <th>{index}</th>
      <td>{user.name}</td>
      <td>
        {user.roles
          .map((role) => {
            //mapping ROLE_ADMIN to admin and ROLE_USER to user
            if (role === "ROLE_ADMIN") return "admin";
            return "user";
          })
          .join(", ")}
      </td>
      <td>
        {user.roles.includes("ROLE_ADMIN") ? (
          //admin cannot delete another admin, so button is disabled
          <button className="btn btn-danger" disabled>
            Can't Delete Admin
          </button>
        ) : (
          //admins can delete their customers
          <button
            className="btn btn-danger"
            onClick={(e) => {
              deleteCustomer(user.id);
            }}
          >
            Delete Customer
          </button>
        )}
      </td>
    </tr>
  );
};

export const ViewUsers = ({ getCustomers, deleteCustomer, customers }) => {
  useEffect(() => {
    //represent initialState
    if (customers.length === 0) {
      getCustomers();
    }
  });

  return (
    <div className="container mt-3">
      <h1 className="text mb-5">Users of the food app</h1>
      <table className="table table-responsive mt-4">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((user, index) => (
            <UserItem
              user={user}
              index={index + 1}
              deleteCustomer={deleteCustomer}
              key={user.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

ViewUsers.propTypes = {
  customers: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  customers: state.customers,
  auth: state.auth,
});

const mapDispatchToProps = { getCustomers, deleteCustomer };

export default connect(mapStateToProps, mapDispatchToProps)(ViewUsers);
