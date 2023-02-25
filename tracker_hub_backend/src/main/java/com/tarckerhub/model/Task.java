package com.tarckerhub.model;

import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {

	@Id
	private String id;
	private String assignmentId;
	private String useremail;
	private String taskId;
	private List<String> attachments;
	private String description;
	private String courseId;
	private String profEmail;
	private List<Reply> replies;
}
