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
public class Messages {

	@Id
	private String id;
	private String messageId;
	private String assignmentId;
	private String description;
	private String messagedBy;
	private Date messageDate = new Date();
	private List<String> attachments;
}
