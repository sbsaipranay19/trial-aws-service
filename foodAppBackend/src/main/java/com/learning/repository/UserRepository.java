package com.learning.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);

	Boolean existsByEmailAndPassword(String email, String password);

}
