package com.learning.validationError;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.ConstraintViolation;

import org.hibernate.validator.internal.engine.path.PathImpl;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

import lombok.Data;

@SuppressWarnings(value = { "unused" })
@Data
public class ApiError {

	private HttpStatus httpStatus;

	@JsonFormat(shape = Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
	private LocalDateTime timestamp;

	private String message;

	private String debugMessage;

	private List<ApiSubError> subErrors;

	private ApiError() {
		this.timestamp = LocalDateTime.now();
	}

	public ApiError(HttpStatus httpStatus) {
		this();
		this.httpStatus = httpStatus;
	}

	public ApiError(HttpStatus status, String message, Throwable exception) {
		this(status);
		this.message = message;
		this.debugMessage = exception.getLocalizedMessage();
	}

	private void addSubError(ApiSubError apiSubError) {
		if (this.subErrors == null)
			this.subErrors = new ArrayList<ApiSubError>();
		this.subErrors.add(apiSubError);
	}

	private void addValidationError(String object, String field, Object rejectedValue, String message) {
		this.addSubError(new ApiValidationError(object, field, rejectedValue, message));
	}

	private void addValidationError(String name, String message) {
		this.addSubError(new ApiValidationError(name, message));
	}

	private void addValidationError(FieldError fieldError) {
		this.addValidationError(fieldError.getObjectName(), fieldError.getField(), fieldError.getRejectedValue(),
				fieldError.getDefaultMessage());
	}

	public void addValidationFieldErrors(List<FieldError> fieldErrors) {
		// fieldErrors.forEach(this::addValidationError);
		fieldErrors.forEach(error -> this.addValidationError(error));
	}

	private void addValidationError(ObjectError objectError) {
		this.addValidationError(objectError.getObjectName(), objectError.getDefaultMessage());
	}

	public void addValidationObjectErrors(List<ObjectError> objectErrors) {
		objectErrors.forEach(error -> this.addValidationError(error));
	}

	public void addValidationError(ConstraintViolation<?> cv) {
		this.addValidationError(cv.getRootBeanClass().getName(),
				((PathImpl) cv.getPropertyPath()).getLeafNode().asString(), cv.getInvalidValue(), cv.getMessage());
	}

	public void addValidationErrors(Set<ConstraintViolation<?>> constraintViolations) {
		constraintViolations.forEach(error -> addValidationError(error));
	}
}
