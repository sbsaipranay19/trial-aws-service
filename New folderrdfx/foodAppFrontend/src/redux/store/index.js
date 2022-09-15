import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import combineReducers from "../reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];
const initialState = {};
const store = createStore(
  combineReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

let currentState = store.getState();

store.subscribe(() => {
  let previousState = currentState;

  currentState = store.getState();

  if (
    currentState.auth.token &&
    currentState.auth.token !== previousState.auth.token
  ) {
    //if token is present and if does not match previous state then we have to update the localStorage for latest token
    localStorage.setItem("token", currentState.auth.token);
  }
});

export default store;
