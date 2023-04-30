package com.tarckerhub.controller;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tarckerhub.model.Messages;
import com.tarckerhub.resposit.MessageRepository;

@RestController
@RequestMapping("/message")
public class MessageController {

	@Autowired
	private MessageRepository messageRepository;

	@PostMapping
	public ResponseEntity<?> addNewAssignment(@RequestBody Messages messages) {
		messages.setMessageId(RandomStringUtils.randomAlphanumeric(10).toString());
		messages.setMessageDate(new Date());

		try {
			Messages savedMessages = messageRepository.save(messages);

			if (savedMessages != null) {
				return ResponseEntity.status(HttpStatus.OK).body(savedMessages);
			}

			if (savedMessages == null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
			}

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getCause().getMessage());
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
	}

	@GetMapping("/{assignmentId}")
	public ResponseEntity<?> getAllMessages(@PathVariable("assignmentId") String assignmentId) {
		List<Messages> list = messageRepository.findByAssignmentId(assignmentId);
		if (!list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}
		
		if (list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No Messages Found.");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body(list);
	}

}
