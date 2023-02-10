package com.tarckerhub.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FollowRequest {

	private String id;
	private String requestId;
	private String courseId;
	private String courseName;
	private String useremail;
	private String authentication;

}
