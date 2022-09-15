package com.learning.payload;

import java.util.Set;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
//constraints are not set because in food update 
//user may send null value for the fields which he don't want to update 

public class UserRegisterRequest {
	@Size(min=5, max=50)
	private String email;
	@Size(min=5, max=50)
	private String name;
	@Size(min=8, max=20)
	private String password;
	@NotBlank
	private String address;
	
	private Set<String> roles;
}
