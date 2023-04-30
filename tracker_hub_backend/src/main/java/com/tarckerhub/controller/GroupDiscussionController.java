package com.tarckerhub.controller;

import java.util.List;

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

import com.tarckerhub.model.GroupDiscussion;
import com.tarckerhub.resposit.GroupDiscussionRepository;

@RestController
@RequestMapping("/group/discussion")
@CrossOrigin(origins = "http://localhost:9092", maxAge = 36000)
public class GroupDiscussionController {

	@Autowired
	private GroupDiscussionRepository discussionRepository;
	
	@PostMapping
	public ResponseEntity<?> postComment(@RequestBody GroupDiscussion groupDiscussion) {
		
		try {
			GroupDiscussion commentedPost = discussionRepository.save(groupDiscussion);
			if(commentedPost !=null) {
				return ResponseEntity.status(HttpStatus.OK).body(commentedPost);						
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getCause().getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
	}
	
	@GetMapping("/{groupId}")
	public ResponseEntity<?> getComment(@PathVariable("groupId") String groupId) {
		
		try {
			List<GroupDiscussion> groupDiscussions = discussionRepository.findByGroupId(groupId);
			if(groupDiscussions !=null) {
				return ResponseEntity.status(HttpStatus.OK).body(groupDiscussions);						
			}
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getCause().getMessage());
		}
		
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong");
	}
}
