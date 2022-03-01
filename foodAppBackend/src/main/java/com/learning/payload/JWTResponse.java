package com.learning.payload;

import java.util.List;
import java.util.stream.Collectors;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.learning.security.services.UserDetailsImpl;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JWTResponse {
	private String token;
	@JsonIgnore
	private String type = "Bearer";
	private Long id;
	private String name;
	private String email;
	private String address;
	private List<String> roles;

	public JWTResponse(String token, UserDetailsImpl user) {
		super();
		this.token = type+" "+token;
		this.id = user.getId();
		this.name = user.getName();
		this.email = user.getEmail();
		this.address = user.getAddress();
		this.roles = user.getAuthorities().stream().map((authority) -> authority.getAuthority())
				.collect(Collectors.toList());
	}

}
