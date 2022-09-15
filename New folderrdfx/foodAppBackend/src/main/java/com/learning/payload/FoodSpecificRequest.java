package com.learning.payload;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data

//constraints are not set because in food update 
//user may send null value for the fields which he don't want to update 
public class FoodSpecificRequest {

	@NotBlank
	private String foodName;

	@NotNull
	private double foodCost;

	@NotBlank
	private String foodType;

	@NotBlank
	private String description;

	@NotBlank
	private String foodPic;
}
