package com.tarckerhub.controller;

import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tarckerhub.model.Task;
import com.tarckerhub.resposit.TaskRepository;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "http://localhost:9092", maxAge = 36000)
public class TaskController {

	@Autowired
	private TaskRepository taskRepository;

	@PostMapping
	public ResponseEntity<?> addTask(@RequestBody Task task) {
		task.setTaskId(RandomStringUtils.randomNumeric(6));
		taskRepository.save(task);
		return ResponseEntity.status(HttpStatus.CREATED).body("Task Added Succefully");
	}

	@GetMapping("/stud/{assignmentId}/{email}")
	public ResponseEntity<?> getTask(@PathVariable("assignmentId") String assignmentId,
			@PathVariable("email") String email) {
		List<Task> list = taskRepository.findbyAssignmentIdAndEmail(assignmentId, email);
		return ResponseEntity.status(HttpStatus.OK).body(list);
	}
	
	@GetMapping("/prof/{assignmentId}/{email}")
	public ResponseEntity<?> getProfTask(@PathVariable("assignmentId") String assignmentId,
			@PathVariable("email") String email) {
		List<Task> list = taskRepository. findbyAssignmentId(assignmentId, email);
		return ResponseEntity.status(HttpStatus.OK).body(list);
	}

	@PutMapping("/stud/{assignmentId}/{email}")
	public ResponseEntity<?> updateTask(@RequestBody Task task) {
		taskRepository.save(task);
		return ResponseEntity.status(HttpStatus.OK).body("your replied");
	}
	
	@PutMapping("/prof/{assignmentId}/{email}")
	public ResponseEntity<?> updateProfTask(@RequestBody Task task) {
		taskRepository.save(task);
		return ResponseEntity.status(HttpStatus.OK).body("your replied");
	}

}
