import { DELETE_CUSTOMER, GET_CUSTOMERS } from "../../../redux/actionsTypes";

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CUSTOMERS:
      return payload;
    case DELETE_CUSTOMER:
      return state.filter((customer) => customer.id !== payload);
    default:
      return state;
  }
};
