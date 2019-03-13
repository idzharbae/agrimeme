package com.agrimeme.backend.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.agrimeme.backend.model.Role;
import com.agrimeme.backend.model.User;

public class LoggedUser implements UserDetails{
	private User user;
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public LoggedUser(User user) {
		this.user=user;
	}
	public Collection<? extends GrantedAuthority> getAuthorities(){
		List<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
		for(Role role : user.getRoles()) {
			authorities.add(new SimpleGrantedAuthority(role.toString()));
		}
		return authorities;
	}
	public String getPassword() {
		return user.getPassword();
	}
	public String getUsername() {
		return user.getUsername();
	}
	public boolean isAccountNonExpired() {
		return true;
	}
	public boolean isAccountNonLocked() {
		return true;
	}
	public boolean isCredentialsNonExpired() {
		return true;
	}
	public boolean isEnabled() {
		return true;
	}
}
