package com.tarckerhub.resposit;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tarckerhub.model.Course;
import com.tarckerhub.model.User;

public interface UserRepository extends MongoRepository<User, String> {

	@Query("{email:?0}")
	User findUserByEmail(String email);

	@Query(value = "{'email': ?0}", fields = "{'courses': ?1}")
	User updatCourse(String email, List<String> list);

	@Query(value = "{'email': ?0}", fields = "{'salt': ?1,'password': ?2}")
	String changePassword(String email, String salt, String password);
}
