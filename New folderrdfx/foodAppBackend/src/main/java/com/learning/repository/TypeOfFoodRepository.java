package com.learning.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning.entity.FoodType;
import com.learning.entity.TypeOfFood;

public interface TypeOfFoodRepository extends JpaRepository<TypeOfFood, Integer> {
	
	Optional<TypeOfFood> findByFoodType(FoodType foodType);
	
}