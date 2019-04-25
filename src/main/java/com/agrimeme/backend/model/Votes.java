package com.agrimeme.backend.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "votes")
public class Votes {
	@EmbeddedId
	private VoteIdentity voteIdentity;
	
	private Long value=0L;

	public VoteIdentity getVoteIdentity() {
		return voteIdentity;
	}

	public void setVoteIdentity(VoteIdentity voteIdentity) {
		this.voteIdentity = voteIdentity;
	}

	public Long getValue() {
		return value;
	}

	public void setValue(Long value) {
		this.value = value;
	}
	
}
