import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
  GET_PROFILE,
  UPDATE_PROFILE,
} from "../../../redux/actionsTypes";

const initialState = {
  userInfo: null,
  isAuthenticated: false,
  isLoading: true,
  token: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case GET_PROFILE:
    case UPDATE_PROFILE:
      //above actions have similar functionality of updating the user info into state of the store
      const { id, name, email, address, roles, token } = payload;
      return {
        ...state,
        token: token,
        userInfo: { id, name, email, address, roles },
        loading: false,
        isAuthenticated: true,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      //above actions have similar functionality of resetting the state of the store
      return {
        ...state,
        token: null,
        userInfo: null,
        loading: false,
        isAuthenticated: false,
      };
    default:
      return { ...state };
  }
};
