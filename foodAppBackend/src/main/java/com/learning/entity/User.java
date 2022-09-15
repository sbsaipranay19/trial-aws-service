package com.learning.entity;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.learning.utils.AddressSerializer;
import com.learning.utils.RoleSerializer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@ToString

@NoArgsConstructor
@AllArgsConstructor
//email should be unique for every user
@Table(name = "user", uniqueConstraints = @UniqueConstraint(columnNames = { "email" }))
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@Email
	private String email;

	@NotBlank
	@Size(min = 2, max = 50)
	private String name;

	@NotBlank
	@Size(max = 150)
	private String password;

	// Same family members can order food i.e many users from same address and
	// each person has only one delivery address
	@ManyToOne
	@JoinColumn(name = "addressId")
	@JsonSerialize(using = AddressSerializer.class)
	private Address address;

	// many users can have many roles
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "regId"), inverseJoinColumns = @JoinColumn(name = "roleId"))
	@JsonSerialize(using = RoleSerializer.class)
	private Set<Role> roles;

	// since id is auto generated all args constructor is not required
	public User(@Email String email, @NotBlank @Size(min = 2, max = 50) String name,
			@NotBlank @Size(min = 8, max = 14) String password, Address address, Set<Role> roles) {
		super();
		this.email = email;
		this.name = name;
		this.password = password;
		this.address = address;
		this.roles = roles;
	}

}
