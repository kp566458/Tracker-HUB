package com.tarckerhub.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tarckerhub.model.Assignments;
import com.tarckerhub.model.FollowRequest;
import com.tarckerhub.model.MailInfo;
import com.tarckerhub.model.User;
import com.tarckerhub.resposit.AssignmentRepository;
import com.tarckerhub.resposit.CourseRequestRepository;
import com.tarckerhub.resposit.UserRepository;
import com.tarckerhub.service.AssignmentService;
import com.tarckerhub.service.StorageService;
import com.tarckerhub.util.CloudinaryService;
import com.tarckerhub.util.SendMailService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/assignment")
@CrossOrigin(origins = "http://localhost:9092", maxAge = 36000)
@Slf4j
public class AssignmentController {

	@Autowired
	private AssignmentRepository assignmentRepository;

	@Autowired
	private AssignmentService assignmentService;

	@Autowired
	private StorageService service;

	@Autowired
	private MongoTemplate mongoTemplate;

	@Autowired
	private CourseRequestRepository courseRequestRepository;

	@Autowired
	private UserRepository userRepository;

	SendMailService sender;

	@Autowired
	private CloudinaryService cloudinaryService;

	public AssignmentController(SendMailService sender) {
		this.sender = sender;
	}

	@PostMapping
	public ResponseEntity<?> addNewAssignment(@RequestBody Assignments assignments) {
		String assignmentId = RandomStringUtils.randomAlphanumeric(10);
		Date date = new Date();
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		int parseUnsignedInt = Integer.parseUnsignedInt(assignments.getDaysCount().toString());
		calendar.add(Calendar.DATE, parseUnsignedInt);
		Date newDate = calendar.getTime();
		assignments.setStartDate(date);
		assignments.setAssignmentId(assignmentId);
		assignments.setEndDate(newDate);
		Assignments savedAssignments = assignmentRepository.save(assignments);

		if (savedAssignments != null) {
			List<FollowRequest> followRequestList = courseRequestRepository
					.findUsersByRequestIdAndAuthenctication(assignments.getCourseId(), "Accepted");

			if (followRequestList != null) {
				for (int i = 0; i < followRequestList.size(); i++) {
					MailInfo mail = new MailInfo(followRequestList.get(i).getUseremail(),
							"New Assignement on CourseID :: " + assignments.getCourseId(),
							" Please Check the Assignment.");
					sender.sendMail(mail);
				}
			}
			return ResponseEntity.status(HttpStatus.CREATED).body("Assignment Published Succesfully.");

		}

		if (savedAssignments == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(assignments);
	}

	// Role :: Professor
	@GetMapping("/{email}")
	public ResponseEntity<?> getAllAssignments(@PathVariable("email") String email) {
		// courseId && email in follow request, ==> Granted
		List<Assignments> list = assignmentRepository.findAllAssignmentsByProfessor(email);
		if (list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Assignments found");
		}

		if (!list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.....");
	}

	// Role Student
	@GetMapping("/student/{email}")
	public ResponseEntity<?> getStudentAssignments(@PathVariable("email") String email) {
		// courseId && email in follow request, ==> Granted
		User user = userRepository.findUserByEmail(email);
		List<Assignments> list = new ArrayList<>();
		if (user.getCourses() != null) {
			for (int i = 0; i < user.getCourses().size(); i++) {
				List<Assignments> assignments = assignmentRepository.findByCourseId(user.getCourses().get(i));
				list.addAll(assignments);
			}
		}
		if (list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Assignments found");
		}

		if (!list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.....");
	}
	
	@SuppressWarnings("unused")
	@GetMapping("/view/{assignmentId}")
	public ResponseEntity<?> getAssignmentsById(@PathVariable("assignmentId") String assignmentId) {
		Assignments assignments = assignmentRepository.findByAssignmentId(assignmentId);
		if (assignments == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Assignments found");
		}

		if (assignments != null) {
			return ResponseEntity.status(HttpStatus.OK).body(assignments);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.....");
	}
	


	@SuppressWarnings("unused")
	@PostMapping("/chat/{assignmentId}")
	public ResponseEntity<?> addChats(@PathVariable("assignmentId") String assignmentId) {
		Assignments assignments = assignmentRepository.findByAssignmentId(assignmentId);
		if (assignments == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Assignments found");
		}

		if (assignments != null) {
			assignments.getDiscussion().add(null);
			return ResponseEntity.status(HttpStatus.OK).body(assignments);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.....");
	}

	
}
