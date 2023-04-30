package com.tarckerhub.controller;

import java.util.ArrayList;
import java.util.List;

import javax.websocket.server.PathParam;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Field;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.tarckerhub.model.Course;
import com.tarckerhub.model.FollowRequest;
import com.tarckerhub.model.RequestAcceptance;
import com.tarckerhub.model.User;
import com.tarckerhub.resposit.CourseRepository;
import com.tarckerhub.resposit.CourseRequestRepository;
import com.tarckerhub.resposit.RequestAcceptanceRepository;
import com.tarckerhub.resposit.UserRepository;
import com.tarckerhub.service.CourseService;
import com.tarckerhub.service.StorageService;
import com.tarckerhub.util.CloudinaryService;

@RestController
@RequestMapping("/course")
@CrossOrigin(origins = "http://localhost:9092", maxAge = 36000)
public class CourseController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CourseRepository courseRepository;

	@Autowired
	private StorageService service;

	@Autowired
	private CourseService courseService;

	@Autowired
	private MongoTemplate mongoTemplate;

	@Autowired
	private CourseRequestRepository courseRequestRepository;

	@Autowired
	private RequestAcceptanceRepository requestAcceptanceRepository;

	@Autowired
	private CloudinaryService cloudinaryService;

	@PostMapping(value = "/", consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> saveCourse(@RequestParam("course") String course,
			@RequestParam("file") MultipartFile file) {
		String url = cloudinaryService.uploadFile(file);
		String serialID = RandomStringUtils.randomNumeric(8);
		Course finalCourse = courseService.gson(course);
		finalCourse.setCourseId(serialID);
		finalCourse.setImageURL(url);
		Course savedCourse = courseRepository.save(finalCourse);
		User user = userRepository.findUserByEmail(finalCourse.getProfessorName());
		List<String> list = new ArrayList<>();
		list.add(savedCourse.getCourseId());
		user.setCourses(list);
		userRepository.save(user);

		if (savedCourse != null) {
			return ResponseEntity.status(HttpStatus.CREATED).body(finalCourse);
		}

		if (savedCourse == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went Wrong");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data....");
	}

	@GetMapping("/")
	public ResponseEntity<?> listAllCourse() {
		List<Course> allCourses = courseRepository.findAll();

		if (allCourses.isEmpty()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No Courses Found.");
		}

		if (allCourses != null) {
			return ResponseEntity.status(HttpStatus.OK).body(allCourses);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data....");
	}

	@GetMapping("/{serialId}")
	public ResponseEntity<?> listAllCourseBySerialId(@PathVariable("serialId") String serialId) {
		Course course = courseRepository.findbyCourseId(serialId);

		if (course == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No Courses Found.");
		}

		if (course != null) {
			return ResponseEntity.status(HttpStatus.OK).body(course);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data....");
	}

	@GetMapping("/student/{email}")
	public ResponseEntity<?> getStudentCourses(@PathVariable("email") String email) {

		User user = userRepository.findUserByEmail(email);
		List<Course> list = new ArrayList<>();
		if (user.getCourses() != null) {
			for (int i = 0; i < user.getCourses().size(); i++) {
				Course course = courseRepository.findbyCourseId(user.getCourses().get(i));
				list.add(course);
			}
		}
		if (list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Courses Found.");
		}

		if (!list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data....");
	}

	@DeleteMapping("/{serialId}")
	public ResponseEntity<?> deleteCourseBySerialId(@PathVariable("serialId") String serialId) {
		courseRepository.deleteByCourseId(serialId);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Deleted Successfully");
	}

	@GetMapping("/CourseCollections")
	public ResponseEntity<?> getAllCouseId() {
		Query query = new Query();
		Field include = query.fields().include("courseId").include("courseName").include("professorName")
				.include("imageURL");
		List<Course> list = mongoTemplate.find(query, Course.class);

		if (list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Courses are Assigned.");
		}

		if (list != null) {
			return ResponseEntity.ok(list);
		}
		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evalauting Data.");

	}

	@GetMapping("/follow/{courseId}/{email}")
	public ResponseEntity<?> followProcess(@PathVariable("courseId") String courseId,
			@PathVariable("email") String email) {
		FollowRequest details = courseRequestRepository.getExistedDetails(courseId, email);

		if (details == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("You are Not yet Requested to Follow.");
		}

		if (details != null) {
			return ResponseEntity.status(HttpStatus.OK).body(details);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.");
	}

	@PostMapping("/followRequest")
	public ResponseEntity<?> requestToFollow(@RequestBody FollowRequest followRequest) {
		String requestId = RandomStringUtils.randomNumeric(6);
		followRequest.setRequestId(requestId);
		FollowRequest details = courseRequestRepository.getExistedDetails(followRequest.getCourseId(),
				followRequest.getUseremail());
		followRequest.setAuthentication("NotGranted");
		if (details == null) {
			FollowRequest request = courseRequestRepository.save(followRequest);
			return ResponseEntity.status(HttpStatus.CREATED)
					.body("Request sent...!\nyou will get the access with in 24hrs.");

		}

		if (details != null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Already Request Sent to Follow the Course.");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.");
	}

	@GetMapping("/followRequest/{courseId}/{authentication}")
	public ResponseEntity<?> GetRequestToFollow(@PathVariable("courseId") String courseId,
			@PathVariable("authentication") String authentication) {
		List<FollowRequest> list = courseRequestRepository.findByRequestIdAndAuthenctication(courseId, authentication);

		if (list == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Recent Request.");
		}

		if (list != null) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}

		return ResponseEntity.ok(null);
	}

	@GetMapping("/followRequest/{courseId}/all")
	public ResponseEntity<?> GetAllRequestToFollow(@PathVariable("courseId") String courseId) {
		List<FollowRequest> list = courseRequestRepository.findByCourseId(courseId);

		if (list == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Recent Request.");
		}

		if (list != null) {
			return ResponseEntity.status(HttpStatus.OK).body(list);
		}

		return ResponseEntity.ok(null);
	}

	@PostMapping("/sendActivatekey/{courseId}/{activatedKey}/{useremail}")
	public ResponseEntity<?> SendActivateKey(@PathVariable("courseId") String courseId,
			@PathVariable("activatedKey") String activatedKey, @PathVariable("useremail") String useremail) {
		FollowRequest details = courseRequestRepository.getExistedDetails(courseId, useremail);
		RequestAcceptance acceptance = new RequestAcceptance();
		if (details != null) {
			acceptance = requestAcceptanceRepository.getExistedDetails(details.getRequestId());
		}

		if (details != null) {
			if (acceptance != null) {
				if (details.getAuthentication() == "Accepted") {
					courseRequestRepository.save(details);
					User user = userRepository.findUserByEmail(useremail);
					if (user != null) {
						if (user.getCourses() != null) {
							user.getCourses().add(courseId);
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
				if (!details.getAuthentication().equals("Accepted")) {
					return ResponseEntity.status(HttpStatus.BAD_REQUEST)
							.body("Invalid !\nyou have enetered wrong key. Please try again");
				}
			}

		}

		if (details == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("you have not requested to follow.");
		}

		if (acceptance == null) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("you did not access to follow.");
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evaluating Data.");

	}

	@GetMapping("/distinctCourse/{professor}")
	public ResponseEntity<?> getDestinctCourseByProfessorName(@PathVariable("professor") String professor) {
		Query query = new Query();
		query.addCriteria(Criteria.where("professorName").is(professor));
		query.fields().include("courseName").include("courseId");
		List<Course> list = mongoTemplate.find(query, Course.class);

		return ResponseEntity.status(HttpStatus.OK).body(list);
	}
	
	@PostMapping("/prof/{email}")
	public ResponseEntity<?> getDetailsByProfessorId(@RequestBody List<String> courses,
			@PathParam("email") String email) {
		List<Course> coursesList = new ArrayList<>();
		for (String course : courses) {
			Course fetchedCourse = courseRepository.findbyCourseId(course);
			coursesList.add(fetchedCourse);
		}
		
		return ResponseEntity.ok(coursesList);
	}

}
