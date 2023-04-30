package com.tarckerhub.model;

import java.util.List;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Groups {

	@Id
	private String id;
	private String groupName;
	private String groupId;
	private List<String> assignments;
	private List<String> courses;
	private List<String> groupMembers;
	private String createdBy;
}
