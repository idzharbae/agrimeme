package com.agrimeme.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.agrimeme.backend.model.VoteIdentity;
import com.agrimeme.backend.model.Votes;

@Repository

public interface VotesRepository extends JpaRepository<Votes, VoteIdentity> {

}
