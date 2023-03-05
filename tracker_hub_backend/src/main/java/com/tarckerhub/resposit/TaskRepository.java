package com.tarckerhub.resposit;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tarckerhub.model.Task;

public interface TaskRepository extends MongoRepository<Task, String> {

	@Query("{assignmentId: ?0, profEmail: ?1}")
	List<Task> findbyAssignmentId(String assignmentId, String email);

	@Query("{assignmentId: ?0, useremail: ?1}")
	List<Task> findbyAssignmentIdAndEmail(String assignmentId, String email);

}
