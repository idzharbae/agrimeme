package com.agrimeme.backend.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "posts")
public class Post extends AuditModel {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne(fetch=FetchType.LAZY, optional=false)
	@JoinColumn(name="user_id",nullable=false)
	@OnDelete(action=OnDeleteAction.CASCADE)
	@JsonIgnore	
	private User user;
	
    @NotNull
    @Size(max = 100)
    private String title;

    @NotNull
    @Size(max = 250)
    private String description;

    @NotNull
    @Size(max = 250)
    private String imageUrl;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

    
    
}
