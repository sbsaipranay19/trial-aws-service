package com.learning.exceptions;

@SuppressWarnings("serial")
public class AccountExistsException extends Exception {

	public AccountExistsException(String message) {
		super(message);
	}
}
