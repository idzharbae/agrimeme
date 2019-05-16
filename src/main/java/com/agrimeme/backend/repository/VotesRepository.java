package com.agrimeme.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.stereotype.Repository;

import com.agrimeme.backend.model.VoteIdentity;
import com.agrimeme.backend.model.Votes;

@Repository

public interface VotesRepository extends JpaRepository<Votes, VoteIdentity> {
	List<Votes> findByVoteIdentityUserId(Long userId);
}
