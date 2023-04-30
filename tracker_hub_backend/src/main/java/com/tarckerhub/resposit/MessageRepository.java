package com.tarckerhub.resposit;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tarckerhub.model.Messages;



public interface MessageRepository extends MongoRepository<Messages, String> {
	
	@Query("{'assignmentId':?0}")
	public List<Messages> findByAssignmentId(String assignmentId);

}
