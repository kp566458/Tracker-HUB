package com.tarckerhub.service;

import java.io.IOException;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tarckerhub.model.SubmitAssignment;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SubmitAssignmentService {
	public SubmitAssignment gson(String SubmitAssignment) {
		SubmitAssignment JSONSubmitAssignment = new SubmitAssignment();
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JSONSubmitAssignment = objectMapper.readValue(SubmitAssignment, SubmitAssignment.class);
		} catch (IOException e) {
			log.error("Assignements Service Error "+new Date()+". \n"+e.toString());
		}
		return JSONSubmitAssignment;
	}
}
