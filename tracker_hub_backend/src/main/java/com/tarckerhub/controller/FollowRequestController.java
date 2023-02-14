package com.tarckerhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.tarckerhub.model.FollowRequest;
import com.tarckerhub.resposit.CourseRequestRepository;

@RestController
@CrossOrigin(origins = "http://localhost:9092", maxAge = 36000)
public class FollowRequestController {

	@Autowired
	private CourseRequestRepository courseRequestRepository;

	@GetMapping("/follow/courseDetails/{courseId}/{email}")
	public ResponseEntity<?> getFollowRequestDetails(@PathVariable("courseId") String courseId,
			@PathVariable("email") String email) {

		FollowRequest followRequest = courseRequestRepository.getExistedDetails(courseId, email);

		if (followRequest != null) {
			return ResponseEntity.status(HttpStatus.OK).body(followRequest);
		}

		if (followRequest == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Found");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data");

	}
	
	
	@GetMapping("/follow/course/{courseId}/{status}")
	public ResponseEntity<?> getRequestUserDetails(@PathVariable("courseId") String courseId,
			@PathVariable("status") String status) {

		List<FollowRequest> userDetails = courseRequestRepository.findByRequestIdAndAuthenctication(courseId, status);

		if (userDetails != null) {
			return ResponseEntity.status(HttpStatus.OK).body(userDetails);
		}

		if (userDetails == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Found");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data");

	}

	
}
