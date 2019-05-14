package com.agrimeme.backend.controller;

import com.agrimeme.backend.exceptions.ResourceNotFoundException;
import com.agrimeme.backend.model.Post;
import com.agrimeme.backend.model.VoteIdentity;
import com.agrimeme.backend.model.Votes;
import com.agrimeme.backend.repository.PostRepository;
import com.agrimeme.backend.repository.UserRepository;
import com.agrimeme.backend.repository.VotesRepository;
import com.agrimeme.backend.security.UserPrincipal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

import javax.annotation.security.RolesAllowed;
import javax.validation.Valid;

@RequestMapping("/api")
@RestController
public class PostController {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VotesRepository votesRepository;
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
            post.setUserId(user.getId());
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
    
    @PostMapping("/posts/{postId}/upvote")
	public Post upvotePost(@PathVariable Long postId) {
		Long userId = ((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
		VoteIdentity vi = new VoteIdentity(postId, userId);
		Optional<Votes> vote = votesRepository.findById(vi);
		if(vote.isPresent()) {
			return postRepository.findById(postId).map(post -> {
				Votes voteObj = vote.get();
				post.setVotes(post.getVotes() - voteObj.getValue());
				voteObj.setValue(1L);
				post.setVotes(post.getVotes() + voteObj.getValue());
	            return postRepository.save(post);
	        }).orElseThrow(() -> new ResourceNotFoundException("PostId " + postId + " not found"));
		}
		return postRepository.findById(postId).map(post -> {
			Votes voteObj = new Votes();
			voteObj.setVoteIdentity(vi);
			voteObj.setValue(1L);
			votesRepository.save(voteObj);
			post.setVotes(post.getVotes() + voteObj.getValue());
	        return postRepository.save(post);
	    }).orElseThrow(() -> new ResourceNotFoundException("PostId " + postId + " not found"));
		
	}
    
    @PostMapping("/posts/{postId}/downvote")
    public Post downvotePost(@PathVariable Long postId) {
    	Long userId = ((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
    	VoteIdentity vi = new VoteIdentity(postId, userId);
    	Optional<Votes> vote = votesRepository.findById(vi);
    	if(vote.isPresent()) {
    		return postRepository.findById(postId).map(post -> {
    			Votes voteObj = vote.get();
    			post.setVotes(post.getVotes() - voteObj.getValue());
    			voteObj.setValue(-1L);
    			post.setVotes(post.getVotes() + voteObj.getValue());
                return postRepository.save(post);
            }).orElseThrow(() -> new ResourceNotFoundException("PostId " + postId + " not found"));
    	}
    	return postRepository.findById(postId).map(post -> {
			Votes voteObj = new Votes();
			voteObj.setVoteIdentity(vi);
			voteObj.setValue(-1L);
			votesRepository.save(voteObj);
			post.setVotes(post.getVotes() + voteObj.getValue());
            return postRepository.save(post);
        }).orElseThrow(() -> new ResourceNotFoundException("PostId " + postId + " not found"));
    	
    }
    
    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable Long postId) {
        Long userId = ((UserPrincipal) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return postRepository.findById(postId).map(post -> {
            if(comment.getUserId() != userId)
                throw new BadRequestException("Unauthorized Request.");
            postRepository.delete(post);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("PostId " + postId + " not found"));
    }

}
