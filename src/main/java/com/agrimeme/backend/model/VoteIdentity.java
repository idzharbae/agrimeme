package com.agrimeme.backend.model;

import java.io.Serializable;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Embeddable
public class VoteIdentity implements Serializable {
	@NotNull
    @Size(max = 20)
    private Long postId;

    @NotNull
    @Size(max = 20)
    private Long userId;

    public VoteIdentity() {

    }

    public VoteIdentity(Long postId, Long userId) {
        this.postId = postId;
        this.userId = userId;
    }
    
    public Long getPostId() {
		return postId;
	}

	public void setPostId(Long postId) {
		this.postId = postId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        VoteIdentity that = (VoteIdentity) o;

        if (!postId.equals(that.postId)) return false;
        return userId.equals(that.userId);
    }

    @Override
    public int hashCode() {
        int result = postId.hashCode();
        result = 31 * result + postId.hashCode();
        return result;
    }
}
