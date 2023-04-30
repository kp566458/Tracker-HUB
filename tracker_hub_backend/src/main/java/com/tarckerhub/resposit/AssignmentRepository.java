package com.tarckerhub.resposit;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tarckerhub.model.Assignments;

public interface AssignmentRepository extends MongoRepository<Assignments, String> {

	@Query("{profEmail : ?0}")
	List<Assignments> findAllAssignmentsByProfessor(String email);
	
	@Query("{courseId : ?0}")
	public List< Assignments>  findByCourseId(String courseId);
	
	@Query("{assignmentId : ?0}")
	public Assignments  findByAssignmentId(String assignmentId);
	

}
