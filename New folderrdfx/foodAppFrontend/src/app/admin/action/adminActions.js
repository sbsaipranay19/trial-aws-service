import { DELETE_CUSTOMER, GET_CUSTOMERS } from "../../../redux/actionsTypes";
import api from "../../../utils/api";
import { setAlert } from "../../core/actions/alertAction";

//admin deleting customer by id
export const deleteCustomer = (id) => async (dispatch) => {
  try {
    const res = await api().delete(`/users/${id}`);
    dispatch({ type: DELETE_CUSTOMER, payload: res.data });
    dispatch(setAlert("Deleted customer", "danger"));
    //using action to update the store after deleting a customer
    dispatch(getCustomers());
  } catch (error) {
    //setting up alerts in case of error
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

//getting all users data
export const getCustomers = () => async (dispatch) => {
  try {
    const res = await api().get(`/users`);
    //action to fetch users data
    dispatch({ type: GET_CUSTOMERS, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};
