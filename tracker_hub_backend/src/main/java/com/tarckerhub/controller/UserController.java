package com.tarckerhub.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Field;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.result.UpdateResult;
import com.tarckerhub.model.CustomResponseEntity;
import com.tarckerhub.model.Login;
import com.tarckerhub.model.User;
import com.tarckerhub.resposit.UserRepository;
import com.tarckerhub.util.HashingPasswordGenerator;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*", maxAge = 36000)
public class UserController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private MongoTemplate mongoTemplate;

	@PostMapping("/signup")
	public ResponseEntity<?> saveUser(@RequestBody User user) throws IOException {
		User userDetails = userRepository.findUserByEmail(user.getEmail());

		if (userDetails != null) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("User Already Existed");
		}

		if (userDetails == null) {
			String salt = HashingPasswordGenerator.getSlat(30);
			user.setSalt(salt);
			String mySecuredPassword = HashingPasswordGenerator.generatingSecurePassword(user.getPassword(), salt);
			user.setPassword(mySecuredPassword);
			userRepository.save(user);
			return ResponseEntity.status(HttpStatus.CREATED).build();
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).build();
	}

	@PatchMapping("/update/{email}")
	public ResponseEntity<?> updateUser(@PathVariable("email") String email, @RequestBody Map<String, Object> fields)
			throws IOException {
		User userDetails = userRepository.findUserByEmail(email);
		if (userDetails == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND)
					.body(new CustomResponseEntity("User Not Found on This Id - " + email, "NOT_FOUND"));
		}

		if (userDetails != null) {
			fields.forEach((key, value) -> {
				java.lang.reflect.Field field = ReflectionUtils.findField(User.class, key); // find field in the object
																							// class
				field.setAccessible(true);
				ReflectionUtils.setField(field, userDetails, value);
			});
			 User updatedUser = userRepository.save(userDetails);
			if (updatedUser == null) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(new CustomResponseEntity("Goal Not Updated", "Bad_Request"));
			}
			if (updatedUser != null) {
				return ResponseEntity.ok("updated successfully");
			}
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new CustomResponseEntity("Goal Not Updated", "Bad_Request"));

	}

	@PostMapping("/login")
	public ResponseEntity<?> userLogin(@RequestBody Login login) {
		User user = userRepository.findUserByEmail(login.getEmail());
		if (user == (null)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("EMail / Password are Invalid");
		}
		boolean mySecuredPassword = HashingPasswordGenerator.verifyUserPassword(login.getPassword(), user.getPassword(),
				user.getSalt());
		if (mySecuredPassword) {
			return ResponseEntity.ok(user);
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("EMail / Password are Invalid");
		}
	}
	@GetMapping("/{email}")
	public ResponseEntity<?> userDetails(@PathVariable("email") String email) {
		User user = userRepository.findUserByEmail(email);
		if (user == (null)) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not Found");
		}
		if (user != null) {
			return ResponseEntity.status(HttpStatus.OK).body(user);
		}
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("SomeThing went wrong");
	}

	@GetMapping("/professors")
	public ResponseEntity<?> getAllCouseId() {
		Query query = new Query();
		query.addCriteria(Criteria.where("role").is("Professor"));
		Field include = query.fields().include("email").include("username").include("role");
		List<User> list = mongoTemplate.find(query, User.class);

		if (list.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Professor Found.");
		}

		if (list != null) {
			return ResponseEntity.ok(list);
		}

		return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evalauting Data.");

	}

	@PutMapping("change/password")
	public ResponseEntity<?> changePassword(@RequestBody Map<String, Object> requestBody) {
		String email = (String) requestBody.get("email");
		Query query = new Query(Criteria.where("email").is(email));
		String password = (String) requestBody.get("password");
		String salt = HashingPasswordGenerator.getSlat(30);
		String mySecuredPassword = HashingPasswordGenerator.generatingSecurePassword(password, salt);
		Update update = new Update().set("password", mySecuredPassword).set("salt", salt);
		 UpdateResult result = mongoTemplate.updateMulti(query, update, User.class);
		return ResponseEntity.status(HttpStatus.OK).body("Password Saved Successfully.");
	}

}
