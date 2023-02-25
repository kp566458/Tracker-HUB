package com.tarckerhub.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("chat")
public class Chat {
	@Id
	private String id;
	private String assignmentId;
	private String description;
	private String fromMail;	
	private List<Reply> replies;
}
