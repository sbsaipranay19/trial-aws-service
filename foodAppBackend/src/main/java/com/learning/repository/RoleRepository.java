package com.learning.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.learning.entity.EROLE;
import com.learning.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

	@Transactional
	void deleteByRoleName(EROLE role);
	
	Boolean existsByRoleName(EROLE role);

	Optional<Role> findByRoleName(EROLE role);
}
