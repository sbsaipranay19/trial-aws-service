package com.learning.controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import javax.naming.AuthenticationException;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning.entity.Address;
import com.learning.entity.EROLE;
import com.learning.entity.Role;
import com.learning.entity.User;
import com.learning.exceptions.AccountExistsException;
import com.learning.exceptions.IdNotFoundException;
import com.learning.payload.JWTResponse;
import com.learning.payload.UserRegisterRequest;
import com.learning.repository.RoleRepository;
import com.learning.security.jwt.JWTUtils;
import com.learning.security.services.UserDetailsImpl;
import com.learning.service.AddressService;
import com.learning.service.UserService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserService userService;

	@Autowired
	AddressService addressService;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JWTUtils jwtUtils;

	@PostMapping(path = "register")
	public ResponseEntity<?> addUser(@Valid @RequestBody UserRegisterRequest userReq) throws AccountExistsException {
		// address is considered as an separate entity so, data from request is taken as
		// map and instantiated object
		Address address = addressService.addAddress(new Address(userReq.getAddress()));

		Set<String> strRoles = userReq.getRoles();

		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByRoleName(EROLE.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error:role not found"));
			roles.add(userRole);
		} else {
			strRoles.forEach(e -> {
				switch (e) {
				case "admin":
					Role roleAdmin = roleRepository.findByRoleName(EROLE.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error:role not found"));
					roles.add(roleAdmin);
					break;

				default:
					Role userRole = roleRepository.findByRoleName(EROLE.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error:role not found"));
					roles.add(userRole);
				}
			});

		}
		User user = new User(userReq.getEmail(), userReq.getName(), passwordEncoder.encode(userReq.getPassword()),
				address, roles);
		user = userService.addUser(user);

		Authentication auth = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(userReq.getEmail(), userReq.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(auth);
		String jwtToken = jwtUtils.generateToken(auth);
		UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
		return ResponseEntity.ok(new JWTResponse(jwtToken, userDetails));

	}

	@PostMapping(path = "/users/authenticate")
	public ResponseEntity<?> authenticate(@RequestBody UserRegisterRequest userReq) throws AuthenticationException {
		// return authentication object on successful authentication, throws
		// Authentication exception in case of wrong credentials
		Authentication auth = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(userReq.getEmail(), userReq.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(auth);
		String jwtToken = jwtUtils.generateToken(auth);
		UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
		return ResponseEntity.ok(new JWTResponse(jwtToken, userDetails));

	}

	@GetMapping(path = "/user/info")
	public ResponseEntity<?> info(@RequestHeader HashMap<String, String> data) throws Exception {
		// returns associated with the request
		if (SecurityContextHolder.getContext().getAuthentication() == null)
			throw new Exception("Session Doesn't exist");
		UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		return ResponseEntity.ok(new JWTResponse(data.get("authorization").replace("Bearer ", ""), userDetails));

	}

	@GetMapping(path = "/users")
	// only admins have rights to inspect all users data
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getUsers() {
		// get all users, returns empty list if user table is empty
		return ResponseEntity.status(200).body(userService.getAllUsers());

	}

	// admins or user can update profile
	@PutMapping(path = "/users/{userId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
	public ResponseEntity<?> updateUser(@PathVariable long userId, @Valid @RequestBody UserRegisterRequest userReq)
			throws IdNotFoundException {
		// updates user by id , throws IdNotFound exception if userId is not found
		Address address = null;
		if (userReq.getAddress() != null)
			address = addressService.addAddress(new Address(userReq.getAddress()));
		Set<String> strRoles = userReq.getRoles();
		Set<Role> roles = new HashSet<>();
		if (strRoles != null) {
			strRoles.forEach(e -> {
				switch (e) {
				case "admin":
					Role roleAdmin = roleRepository.findByRoleName(EROLE.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error:role not found"));
					roles.add(roleAdmin);
					break;

				default:
					Role userRole = roleRepository.findByRoleName(EROLE.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error:role not found"));
					roles.add(userRole);
				}
			});
		}
		// the fields which are null represents that user don't want to update those
		// fields
		// in case if roles is null => user don't want to update his roles
		User user = new User(userReq.getEmail(), userReq.getName(), passwordEncoder.encode(userReq.getPassword()), address,
				strRoles == null ? null : roles);
		user.setId(userId);
		user = userService.updateUserById(userId, user);
		return ResponseEntity.status(200).body(user);
	}

	@GetMapping(path = "/users/{userId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
	// admins or user can see profiles
	public ResponseEntity<?> getUser(@PathVariable long userId) throws IdNotFoundException {
		// get user by id , throws IdNotFound exception if userId is not found
		User user = userService.getUserById(userId);
		return ResponseEntity.status(200).body(user);
	}

	@DeleteMapping(path = "/users/{userId}")
	@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
	// admins or user can delete profiles
	public ResponseEntity<?> deleteUser(@PathVariable long userId) throws IdNotFoundException {
		// deleting user by id , throws IdNotFound exception if userId is not found
		userService.deleteUserById(userId);
		HashMap<String, String> map = new HashMap<>();
		map.put("Message", "User deleted successfully");
		return ResponseEntity.status(200).body(map);
	}

}
