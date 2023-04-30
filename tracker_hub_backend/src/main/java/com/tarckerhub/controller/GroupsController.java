package com.tarckerhub.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tarckerhub.model.Groups;
import com.tarckerhub.model.User;
import com.tarckerhub.resposit.GroupsRepository;
import com.tarckerhub.resposit.UserRepository;

@RestController
@RequestMapping("/group")
@CrossOrigin(origins = "http://localhost:9092", maxAge = 36000)
public class GroupsController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private GroupsRepository groupRepository;

	@PostMapping
	public ResponseEntity<?> addGroup(@RequestBody Groups groups) {
		String groupId = RandomStringUtils.randomAlphanumeric(8);
		groups.setGroupId(groupId);
		List<String> groupMember = new ArrayList<>();
		try {
			for (String user : groups.getGroupMembers()) {
				User userDetails = userRepository.findUserByEmail(user);
				if (userDetails.getMemberInGroup() == null) {
					groupMember.add(groupId);
					userDetails.setMemberInGroup(groupMember);
				} else {
					userDetails.getMemberInGroup().add(groupId);
				}
				userRepository.save(userDetails);
			}
			Groups createdGroup = groupRepository.save(groups);
			if (createdGroup != null) {
				return ResponseEntity.ok(createdGroup);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("something wrong");
	}

	@GetMapping("/prof/{email}")
	public ResponseEntity<?> getCreateadGroup(@PathVariable("email") String email) {
		try {
			List<Groups> groups = groupRepository.findByCreatedBy(email);
			if (groups != null) {
				return ResponseEntity.ok(groups);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getCause().getMessage());
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("something wrong");
	}
	
	@GetMapping("/stud/{email}")
	public ResponseEntity<?> getCreateadGroupMembers(@PathVariable("email") String email) {
		List<Groups> groups = new ArrayList<>();
		try {
			User user = userRepository.findUserByEmail(email);
			
			if (user != null) {
				user.getMemberInGroup().forEach(me -> {
					groups.addAll( groupRepository.findByGroupId(me));
				});
				return ResponseEntity.ok(groups);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getCause().getMessage());
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("something wrong");
	}

	@GetMapping("/prof/{groupId}/members")
	public ResponseEntity<?> getGroupMembersByGroupId(@PathVariable("groupId") String groupId) {
		try {
			Groups groups = groupRepository.findById(groupId).get();
			if(groups != null) {
				return ResponseEntity.status(HttpStatus.OK).body(groups);
			}
			if(groups == null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No Group Found");
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getCause().getMessage());
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("something wrong");
	}

}
