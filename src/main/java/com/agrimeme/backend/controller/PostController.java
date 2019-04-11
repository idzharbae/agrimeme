package com.agrimeme.backend.controller;

import com.agrimeme.backend.exceptions.ResourceNotFoundException;
import com.agrimeme.backend.model.Post;
import com.agrimeme.backend.repository.PostRepository;
import com.agrimeme.backend.repository.UserRepository;
import com.agrimeme.backend.security.UserPrincipal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;

@RequestMapping("/api")
@RestController
public class PostController {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public String hello() {
    	return "Hello.";
    }
    @GetMapping("/posts")
    public Page<Post> getAllPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }
    @GetMapping("/posts/{postId}")
    public Post getPostById(@PathVariable Long postId) {
    	return postRepository.findById(postId).
    			orElseThrow(() -> new ResourceNotFoundException("PostId " + postId + " not found"));
    }
    
    @RolesAllowed("ROLE_USER")
    @PostMapping("/posts")
    public Post createPost(@Valid @RequestBody Post post) {
    	Long userId = ((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
    	return userRepository.findById(userId).map(user -> {
            post.setUser(user);
            return postRepository.save(post);
        }).orElseThrow(() -> new ResourceNotFoundException("UserId " + userId + " not found"));
    	
    }
    
    @PutMapping("/posts/{postId}")
    public Post updatePost(@PathVariable Long postId, @Valid @RequestBody Post postRequest) {
    	
        return postRepository.findById(postId).map(post -> {
            post.setTitle(postRequest.getTitle());
            post.setDescription(postRequest.getDescription());
            post.setImageUrl(postRequest.getImageUrl());
            return postRepository.save(post);
        }).orElseThrow(() -> new ResourceNotFoundException("PostId " + postId + " not found"));
    }
    
    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Long postId) {
        return postRepository.findById(postId).map(post -> {
            postRepository.delete(post);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("PostId " + postId + " not found"));
    }

}
