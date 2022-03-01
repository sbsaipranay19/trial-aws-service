package com.learning.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning.entity.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {

	Optional<Address> findByAddress(String address);

}
