package com.tarckerhub.service;

import java.io.IOException;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tarckerhub.model.Course;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CourseService {

	public Course gson(String course) {
		Course JSONCourse = new Course();
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JSONCourse = objectMapper.readValue(course, Course.class);
		} catch (IOException e) {
			log.error("Course Service Error "+new Date()+". \n"+e.toString());
		}
		return JSONCourse;
	}
}
