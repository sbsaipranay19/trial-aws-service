import {
  ADD_FOOD,
  DELETE_FOOD,
  GET_FOODS,
  GET_FOOD_BY_TYPE,
  GET_FOOD_DETAILS,
  UPDATE_FOOD,
} from "../../../redux/actionsTypes";
import api from "../../../utils/api";
import { setAlert } from "../../core/actions/alertAction";

//Fetch all foods
export const getAllFoods = () => async (dispatch) => {
  try {
    const res = await api().get("/food/");
    dispatch({ type: GET_FOODS, payload: res.data });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

//fetch food of specific type
export const getFoodByType = (type) => async (dispatch) => {
  try {
    const res = await api().get("/food/" + type);
    dispatch({ type: GET_FOOD_BY_TYPE, payload: res.data });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

//update food item
export const editFood = (formData, id) => async (dispatch) => {
  try {
    const res = await api().put(`/foods/${id}`, formData);
    dispatch({ type: UPDATE_FOOD, payload: res.data });
    dispatch(setAlert("You edited Food Item successfully.", "success"));
    dispatch(getAllFoods());
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

//get complete food details
export const getFood = (id) => async (dispatch) => {
  try {
    const res = await api().get(`/foods/${id}`);
    dispatch({ type: GET_FOOD_DETAILS, payload: res.data });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

//creating food
export const createFood = (formData, navigate) => async (dispatch) => {
  try {
    const res = await api().post("/food", formData);
    dispatch({ type: ADD_FOOD, payload: res.data });
    navigate("/food");
    //update foods store after adding food
    dispatch(getAllFoods());
    dispatch(setAlert("You Added Food Item successfully.", "success"));
  } catch (err) {
    const res = err.response.data;
    if (res.subErrors) {
      res.subErrors.forEach((error) =>
        dispatch(setAlert(error.field + " " + error.message, "danger"))
      );
    } else {
      dispatch(setAlert(res.message, "danger"));
    }
  }
};

//deleting food
export const deleteFood = (id) => async (dispatch) => {
  try {
    const res = await api().delete(`/foods/${id}`);
    // action to delete food
    dispatch({ type: DELETE_FOOD, payload: null });
    //action to update the foods array in store
    dispatch(getAllFoods());
    dispatch(setAlert("Deleted food", "danger"));
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};
