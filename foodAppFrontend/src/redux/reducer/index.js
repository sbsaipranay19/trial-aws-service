import { combineReducers } from "redux";
import auth from "../../app/auth/reducer/authReducer";
import alerts from "../../app/core/reducer/alertReducer";
import food from "../../app/food/reducer/foodReducer";
import cart from "../../app/cart/reducer/orderReducer";
import customers from "../../app/admin/redux/customersReducer";
export default combineReducers({
  auth,
  alerts,
  food,
  cart,
  customers,
});
