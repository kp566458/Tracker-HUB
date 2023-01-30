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

}
