package com.agrimeme.backend.exceptions;

import java.util.Date;

public class ExceptionResponse {
	// Structure : timestamp, message, details
	Date timestamp;
	String message;
	String details;
	public ExceptionResponse(Date timestamp, String message, String details) {
		super();
		this.timestamp = timestamp;
		this.message = message;
		this.details = details;
	}
	public Date getTimestamp() {
		return timestamp;
	}
	public String getMessage() {
		return message;
	}
	public String getDetail() {
		return details;
	}
	
}
