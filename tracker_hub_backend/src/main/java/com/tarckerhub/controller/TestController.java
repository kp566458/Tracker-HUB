package com.tarckerhub.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tarckerhub.model.FollowRequest;
import com.tarckerhub.resposit.CourseRequestRepository;

@RestController
@RequestMapping("/test")
public class TestController {

	@Autowired
	private CourseRequestRepository courseRequestRepository;
	
	@GetMapping("/{courseId}")
	public ResponseEntity<?> getDetailsList(@PathVariable("courseId") String courseId){
		List<FollowRequest> list = courseRequestRepository.findUsersByRequestIdAndAuthenctication(courseId, "Accepted");
		return ResponseEntity.ok(list);
	}
}
