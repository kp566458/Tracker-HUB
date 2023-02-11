package com.tarckerhub.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestAcceptance {

	private String requestId;
	private String courseId;
	private String status;
	private String userEmail;
	private String profEmail;
}
