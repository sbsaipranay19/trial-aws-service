package com.learning.entity;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "role")
@Table(uniqueConstraints = @UniqueConstraint(columnNames = { "roleName" }))
public class Role {

	@Id
	@JsonIgnore
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int roleId;

	@NotNull
	@Enumerated(EnumType.STRING)
	private EROLE roleName;

	public Role(String role) {
		this.roleName = EROLE.valueOf(role);
	}

}