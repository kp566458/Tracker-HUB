package com.tarckerhub.controller;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tarckerhub.model.Assignments;
import com.tarckerhub.model.SubmitAssignment;
import com.tarckerhub.resposit.AssignmentRepository;
import com.tarckerhub.resposit.SubmitRepository;
import com.tarckerhub.service.StorageService;
import com.tarckerhub.service.SubmitAssignmentService;
import com.tarckerhub.util.CloudinaryService;
import com.tarckerhub.util.SendMailService;

@RestController
@RequestMapping("/sumbitAssignment")
public class SubmitAssignmentController {

	@Autowired
	private SendMailService sender;

	@Autowired
	private MongoTemplate mongoTemplate;

	@Autowired
	private SubmitAssignmentService submitAssignmentService;

	@Autowired
	private StorageService service;

	@Autowired
	private SubmitRepository submitRepository;

	@Autowired
	private AssignmentRepository assignmentRepository;

	@Autowired
	private CloudinaryService cloudinaryService;

	@PostMapping
	public ResponseEntity<?> addNewAssignment(@RequestBody SubmitAssignment assignment) {
		String submitId = RandomStringUtils.randomAlphanumeric(10);
		assignment.setSubmitId(submitId);
		assignment.setSubmittingDate(new Date());

		SubmitAssignment messagedBy = submitRepository.findByAssignmentIdAndMessagedBy(assignment.getAssignmentId(),
				assignment.getMessagedBy());

		if (messagedBy == null) {
			Assignments assignements = assignmentRepository.findByAssignmentId(assignment.getAssignmentId());
			SubmitAssignment savedSubmittedAssignment = null;
			if (assignment.getSubmittingDate().before(assignements.getEndDate())) {
				savedSubmittedAssignment = submitRepository.save(assignment);
			}
			if (savedSubmittedAssignment != null) {
				return ResponseEntity.status(HttpStatus.CREATED).body("Assignment Submitted Succesfully.");

			}
			if (savedSubmittedAssignment == null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
			}
		}

		if (messagedBy != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You already Submitted the Assingment");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(assignment);
	}

	@GetMapping("/{assignmentId}")
	public ResponseEntity<?> getAllMessages(@PathVariable("assignmentId") String assignmentId) {
		List<SubmitAssignment> list = submitRepository.findByAssignmentId(assignmentId);
		if (!list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}

		if (list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(list);
	}

	@GetMapping("/{assignmentId}/{email}")
	public ResponseEntity<?> getSubmittedAssignment(@PathVariable("assignmentId") String assignmentId,
			@PathVariable("email") String email) {
		SubmitAssignment submitAssignment = submitRepository.findByAssignmentIdAndMessagedBy(assignmentId, email);
//		Query query = new Query();
//        query.addCriteria(Criteria.where("assignmentId").is(assignmentId));
//        query.addCriteria(Criteria.where("messagedBy").is(email));
//		SubmitAssignment submitAssignment = mongoTemplate.findOne(query, SubmitAssignment.class);
		if (submitAssignment != null) {
			return ResponseEntity.status(HttpStatus.OK).body(submitAssignment);
		}

		if (submitAssignment == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("you are not submitted assignment");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(submitAssignment);
	}

	@GetMapping("/student/{email}")
	public ResponseEntity<?> getAllSubmittedAssignment(@PathVariable("email") String email) {
		List<SubmitAssignment> list = submitRepository.findSubmitAssignmentsByAssignmentIdAndMessagedBy(email);
		if (!list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}

		if (list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(list);
	}

	@GetMapping("/prof/{email}")
	public ResponseEntity<?> getAllProfAssignment(@PathVariable("email") String email) {
		List<SubmitAssignment> list = submitRepository.findSubmitAssignmentsByAssignmentIdAndProf(email);
		if (!list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}

		if (list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(list);
	}

	@SuppressWarnings("unused")
	@GetMapping("/view/prof/{assignmentId}")
	public ResponseEntity<?> getAssignmentsBySubmitId(@PathVariable("assignmentId") String assignmnetId) {
		SubmitAssignment assignments = submitRepository.findByAssignment(assignmnetId);
		if (assignments == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Assignments found");
		}

		if (assignments != null) {
			return ResponseEntity.status(HttpStatus.OK).body(assignments);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.....");
	}
	
	@SuppressWarnings("unused")
	@GetMapping("/view/stud/{assignmentId}")
	public ResponseEntity<?> getStudentAssignmentsBySubmitId(@PathVariable("assignmentId") String assignmnetId) {
		SubmitAssignment assignments = submitRepository.findByAssignment(assignmnetId);
		if (assignments == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Assignments found");
		}
		if (assignments != null) {
			return ResponseEntity.status(HttpStatus.OK).body(assignments);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.....");
	}


	@SuppressWarnings("unused")
	@PutMapping("/update/prof/{submitId}/{score}")
	public ResponseEntity<?> updateAssignmentsBySubmitId(@PathVariable("submitId") String submitId,
			@PathVariable("score") String score) {
		SubmitAssignment assignments = submitRepository.findAssignmentBySubmitId(submitId);
		if (assignments == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Assignments found");
		}

		if (assignments != null) {
			assignments.setScore(score);
			submitRepository.save(assignments);
			return ResponseEntity.status(HttpStatus.OK).body(assignments);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.....");
	}

}
