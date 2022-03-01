import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useMatch, useParams } from "react-router-dom";
import { editFood, getFood, createFood } from "../actions/foodAction";
import { useNavigate } from "react-router-dom";

export const FoodForm = ({
  editFood,
  getFood,
  createFood,
  food: { currentFood },
}) => {
  const [formData, setFormData] = useState({
    foodName: "",
    foodCost: "",
    foodPic: "",
    foodType: "Indian",
    description: "",
  });
  const { foodName, foodCost, foodPic, foodType, description } = formData;

  const { id } = useParams();
  //check whether the action is add/ update based on the url matches
  const isCreate = useMatch("/admin/addFood");
  const navigate = useNavigate();
  useEffect(() => {
    //load existing info if it is edit
    if (currentFood && !isCreate) {
      setFormData(currentFood);
    } else if (!currentFood && id) {
      getFood(id);
    }
  }, [getFood, currentFood, id]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isCreate) {
      createFood(
        { foodName, foodCost, foodPic, foodType, description },
        navigate
      );
    } else {
      editFood({ foodName, foodCost, foodPic, foodType, description }, id);
    }
  };

  return (
    <div className="container mt-4">
      <div className="col">
        <h3>{isCreate ? "Add " : "Edit "}food details</h3>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="foodName" className="form-label">
              Food name
            </label>
            <input
              type="text"
              className="form-control"
              id="foodName"
              name="foodName"
              onChange={onChange}
              value={foodName}
              aria-describedby="foodNameHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="foodCost" className="form-label">
              Food cost
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">₹</span>
              <input
                type="number"
                className="form-control"
                id="foodCost"
                name="foodCost"
                onChange={onChange}
                value={foodCost}
                aria-label="Amount (to the nearest dollar)"
              />
              <span className="input-group-text">.00</span>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="foodDesc" className="form-label">
              Food description
            </label>
            <textarea
              className="form-control"
              id="foodDesc"
              name="description"
              onChange={onChange}
              value={description}
              rows="5"
              maxLength="150"
              aria-describedby="foodDescHelp"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="foodPic" className="form-label">
              Food picture URL
            </label>
            <input
              type="web"
              className="form-control"
              id="foodPic"
              name="foodPic"
              onChange={onChange}
              value={foodPic}
              aria-describedby="foodPicHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="foodPic" className="form-label">
              Food type
            </label>
            <select
              className="form-select"
              name="foodType"
              onChange={onChange}
              value={foodType}
            >
              <option value="Indian">INDIAN</option>
              <option value="Chinese">CHINESE</option>
              <option value="Mexican">MEXICAN</option>
            </select>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              {isCreate ? "Add Food" : "Update food"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

FoodForm.propTypes = {
  editFood: PropTypes.func.isRequired,
  getFood: PropTypes.func.isRequired,
  createFood: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  food: state.food,
});

const mapDispatchToProps = { editFood, getFood, createFood };

export default connect(mapStateToProps, mapDispatchToProps)(FoodForm);
