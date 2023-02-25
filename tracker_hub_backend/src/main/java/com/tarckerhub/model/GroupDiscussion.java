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
public class GroupDiscussion {

	@Id
	private String id;
	private String groupId;
	private String description;
	private String messagedBy;
	private List<Reply> replies;
	private Date date = new Date();
	private List<String> attachments;
}
