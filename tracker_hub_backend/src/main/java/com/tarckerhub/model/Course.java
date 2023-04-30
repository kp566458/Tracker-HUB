package com.tarckerhub.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {

	@Id
	private String courseId;
	private String courseName;
	private String professorName;
	private String courseDuration;
	private String imageURL;
	private String courseContent;
}
