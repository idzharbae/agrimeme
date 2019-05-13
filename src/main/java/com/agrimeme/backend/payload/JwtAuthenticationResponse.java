package com.agrimeme.backend.payload;

public class JwtAuthenticationResponse {
    private String accessToken;
    private Long userId;
    private String tokenType = "Bearer";

    public JwtAuthenticationResponse(String accessToken, Long userId) {
        this.accessToken = accessToken;
        this.setUserId(userId);
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
}