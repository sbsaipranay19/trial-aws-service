package com.learning.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning.entity.Food;
import com.learning.entity.TypeOfFood;

public interface FoodRepository extends JpaRepository<Food, Long> {

	List<Food> findAllByTypeOfFood(TypeOfFood typeOfFood);
}