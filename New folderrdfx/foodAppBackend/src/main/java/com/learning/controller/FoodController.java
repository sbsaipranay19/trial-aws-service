package com.learning.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning.entity.Food;
import com.learning.entity.FoodType;
import com.learning.entity.TypeOfFood;
import com.learning.exceptions.AccountExistsException;
import com.learning.exceptions.IdNotFoundException;
import com.learning.payload.FoodSpecificRequest;
import com.learning.service.FoodService;
import com.learning.service.TypeOfFoodService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class FoodController {

	@Autowired
	FoodService foodService;

	@Autowired
	TypeOfFoodService typeOfFoodService;

	@PostMapping(path = "/food")
	// only admin can add the food
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> addFood(@Valid @RequestBody FoodSpecificRequest foodReq) throws AccountExistsException {
		// food type is considered as an separate entity so, data from request is taken
		// as map and instantiated object
		TypeOfFood type = typeOfFoodService.addType(new TypeOfFood(FoodType.valueOf(foodReq.getFoodType())));
		Food food = new Food(foodReq.getFoodName(), foodReq.getFoodCost(), type, foodReq.getDescription(),
				foodReq.getFoodPic());
		food = foodService.addFood(food);
		return ResponseEntity.status(201).body(food);

	}

	@GetMapping(path = "/food/")
	// admin or user can see the foods offered
	public ResponseEntity<?> getFoods() {
		return ResponseEntity.status(200).body(foodService.getAllFoods());
	}

	@GetMapping(path = "/food/{foodType}")
	// admin or user can see the foods offered by specific category
	public ResponseEntity<?> getFoodsOfType(@PathVariable FoodType foodType) {

		Optional<TypeOfFood> type = typeOfFoodService.findByFoodType(foodType);
		if (type.isEmpty())
			return ResponseEntity.status(200).body(new ArrayList<String>());
		return ResponseEntity.status(200).body(foodService.findAllByTypeOfFood(type.get()));
	}

	@GetMapping(path = "/foods/{foodId}")
	// admin or user can see the food by id
	public ResponseEntity<?> getFood(@PathVariable long foodId) throws IdNotFoundException {
		Food food = foodService.getFoodById(foodId);
		return ResponseEntity.status(200).body(food);
	}

	@PutMapping(path = "/foods/{foodId}")
	// only admin can update the food
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> updateFood(@PathVariable long foodId,@Valid @RequestBody FoodSpecificRequest foodReq)
			throws IdNotFoundException {
		TypeOfFood type = null;
		if (foodReq.getFoodType() != null)
			type = typeOfFoodService.addType(new TypeOfFood(FoodType.valueOf(foodReq.getFoodType())));
		Food food = new Food(foodReq.getFoodName(), foodReq.getFoodCost(), type, foodReq.getDescription(),
				foodReq.getFoodPic());
		food.setId(foodId);
		food = foodService.updateFoodById(foodId, food);
		return ResponseEntity.status(200).body(food);
	}

	@DeleteMapping(path = "/foods/{foodId}")
	// only admin can delete food
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> deleteFood(@PathVariable long foodId) throws IdNotFoundException {
		foodService.deleteFoodById(foodId);
		HashMap<String, String> map = new HashMap<>();
		map.put("Message", "Food deleted successfully");
		return ResponseEntity.status(200).body(map);
	}

}
