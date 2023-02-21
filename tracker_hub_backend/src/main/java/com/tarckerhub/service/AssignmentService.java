package com.tarckerhub.service;

import java.io.IOException;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tarckerhub.model.Assignments;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AssignmentService {
	public Assignments gson(String assignements) {
		Assignments JSONAssignements = new Assignments();
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JSONAssignements = objectMapper.readValue(assignements, Assignments.class);
		} catch (IOException e) {
			log.error("Assignements Service Error "+new Date()+". \n"+e.toString());
		}
		return JSONAssignements;
	}
}
