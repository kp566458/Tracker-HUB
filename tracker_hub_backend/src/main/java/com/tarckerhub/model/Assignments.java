package com.tarckerhub.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Assignments {
	@Id
	private String id;
	private String courseId;
	private String assignmentId;
	private String title;
	private String description;
	private String daysCount;
	private Date startDate;
	private Date endDate;
	private String profEmail;
	private List<String> attachments;
	private List<Chat> discussion;
	private String maxScore;
}
