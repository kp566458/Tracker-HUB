package com.tarckerhub.resposit;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tarckerhub.model.Assignments;
import com.tarckerhub.model.SubmitAssignment;

public interface SubmitRepository extends MongoRepository<SubmitAssignment, String> {

	@Query("{'assignmentId':?0}")
	List<SubmitAssignment> findByAssignmentId(String assignmentId);
	
	@Query("{ $and: [{ 'assignmentId': ?0 }, { 'messagedBy': ?1 }]}")
	SubmitAssignment findByAssignmentIdAndMessagedBy(String assignmentId, String email);
	
	@Query("{'messagedBy':?0}")
	List<SubmitAssignment> findSubmitAssignmentsByAssignmentIdAndMessagedBy(String email);
	
	@Query("{'profEmail':?0}")
	List<SubmitAssignment> findSubmitAssignmentsByAssignmentIdAndProf(String email);

	@Query("{'assignmentId' : ?0}")
	public SubmitAssignment findByAssignment(String assignmentId);	
	
	
	@Query("{'submitId' :?0}")
	public SubmitAssignment findAssignmentBySubmitId(String submitId);

}
