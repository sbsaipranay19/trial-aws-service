import {
  ADD_TO_CART,
  FETCH_CART,
  REMOVE_FROM_CART,
} from "../../../redux/actionsTypes";

const initialState = [];

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CART:
      return payload;
    case ADD_TO_CART:
      localStorage.setItem("cart", JSON.stringify([...state, payload]));
      return [...state, payload];
    case REMOVE_FROM_CART:
      //removing food item from cart and updating the localStorage bysaving stringified data
      localStorage.setItem(
        "cart",
        JSON.stringify(state.filter((food) => food.id != payload))
      );
      return state.filter((food) => food.id != payload);
    default:
      return state;
  }
};
