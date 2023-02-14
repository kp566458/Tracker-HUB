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

import com.tarckerhub.model.FollowRequest;
import com.tarckerhub.model.MailInfo;
import com.tarckerhub.model.RequestAcceptance;
import com.tarckerhub.model.User;
import com.tarckerhub.resposit.CourseRequestRepository;
import com.tarckerhub.resposit.RequestAcceptanceRepository;
import com.tarckerhub.resposit.UserRepository;
import com.tarckerhub.util.SendMailService;

@RestController
@CrossOrigin(origins = "http://localhost:9092", maxAge = 36000)
public class RequestAcceptanceController {

	@Autowired
	private RequestAcceptanceRepository requestAcceptanceRepository;

	@Autowired
	private CourseRequestRepository courseRequestRepository;

	SendMailService sender;

	@Autowired
	private UserRepository userRepository;

	public RequestAcceptanceController(SendMailService sender) {
		this.sender = sender;
	}

	@PostMapping("/request/accept/{email}/{courseId}")
	public ResponseEntity<?> allowRequestAccept(@RequestBody RequestAcceptance requestAcceptance,
			@PathVariable("email") String email, @PathVariable("courseId") String courseId) {
		requestAcceptance.setStatus("Accepted");
		RequestAcceptance details = requestAcceptanceRepository.getExistedDetails(requestAcceptance.getRequestId());
		if (details == null) {
			requestAcceptanceRepository.save(requestAcceptance);
			MailInfo mail = new MailInfo(email, "Permission for Course", "You Granted permission for the course.");
			sender.sendMail(mail);
			FollowRequest followRequest = courseRequestRepository.findByRequestId(requestAcceptance.getRequestId());
			followRequest.setAuthentication("Accepted");
			courseRequestRepository.save(followRequest);
			FollowRequest details2 = courseRequestRepository.getExistedDetails(courseId, email);
			RequestAcceptance acceptance = new RequestAcceptance();
			if (details2 != null) {
				acceptance = requestAcceptanceRepository.getExistedDetails(details2.getRequestId());
			}

			if (details2 != null) {
				if (acceptance != null) {
					if (details2.getAuthentication() != "Accepted") {
						courseRequestRepository.save(details2);
						User user = userRepository.findUserByEmail(email);
						if (user != null) {
							if (user.getCourses() != null) {
								user.getCourses().add(courseId);
								userRepository.save(user);
							}
							if (user.getCourses() == null) {
								List<String> list = new ArrayList<>();
								list.add(courseId);
								user.setCourses(list);
								userRepository.save(user);
							}
						}

						return ResponseEntity.status(HttpStatus.OK).body("Congratulations !");
					}
				}

			}
			
			return ResponseEntity.status(HttpStatus.OK).body("Accepted");
		}

		if (details != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already Checked Request");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.");
	}

	@PostMapping("request/reject/{email}")
	public ResponseEntity<?> denyRequestAccept(@RequestBody RequestAcceptance requestAcceptance,
			@PathVariable("email") String email) {
		String generatedKey = RandomStringUtils.randomAlphanumeric(24);
		requestAcceptance.setStatus("Rejected");

		RequestAcceptance details = requestAcceptanceRepository.getExistedDetails(requestAcceptance.getRequestId());
		if (details == null) {
			requestAcceptanceRepository.save(requestAcceptance);
			FollowRequest followRequest = courseRequestRepository.findByRequestId(requestAcceptance.getRequestId());
			followRequest.setAuthentication("Rejected");
			courseRequestRepository.save(followRequest);
			return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Rejected");
		}

		if (details != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already Checked Request");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.");
	}
	
	@GetMapping("{porfEmail}")
	public ResponseEntity<?> getCourseAcceptedList(@PathVariable("profEmail") String profEmail) {
		
		return ResponseEntity.ok("");
				
		
	}

}
