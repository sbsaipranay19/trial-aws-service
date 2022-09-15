package com.learning.security.services;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.learning.entity.User;

import lombok.Getter;

@SuppressWarnings("serial")
@Getter
public class UserDetailsImpl implements UserDetails {

	private Long id;

	private String email;

	private String name;

	private String address;

	@JsonIgnore
	private String password;

	private Collection<? extends GrantedAuthority> authorities;

	private UserDetailsImpl(Long id, String email, String name, String password,
			Collection<? extends GrantedAuthority> authorities, String address) {
		this.id = id;
		this.email = email;
		this.name = name;
		this.password = password;
		this.authorities = authorities;
		this.address = address;
	}

	public static UserDetailsImpl build(User user) {
		//converting roles to authority type
		List<GrantedAuthority> authorities = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getRoleName().toString())).collect(Collectors.toList());
		return new UserDetailsImpl(user.getId(), user.getEmail(), user.getName(), user.getPassword(), authorities, user.getAddress().getAddress());
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}

	@Override
	public String getUsername() {
		return this.email;
	}

}
