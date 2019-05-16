package com.agrimeme.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.agrimeme.backend.model.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByUserId(Long userId);
    @Query(value = "SELECT * FROM posts where created_at >= (CURDATE() - INTERVAL 7 DAY) ORDER BY votes DESC", nativeQuery = true)
    Page<Post> findAllByOrderByVotesDesc(Pageable pageable);
}
