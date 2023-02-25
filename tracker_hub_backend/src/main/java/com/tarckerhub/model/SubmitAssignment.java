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
public class SubmitAssignment {
	@Id
	private String id;
	private Date submittingDate;
	private String submitId;
	private String assignmentId;
	private String description;
	private String messagedBy;
	private String profEmail;
	private List<String> attachments;
	private String score;
	private String maxScore;
}
