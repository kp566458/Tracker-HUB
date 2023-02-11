package com.tarckerhub.resposit;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tarckerhub.model.RequestAcceptance;

public interface RequestAcceptanceRepository extends MongoRepository<RequestAcceptance, String> {


	@Query("{requestId: ?0}")
	public RequestAcceptance getExistedDetails(String requestedId);
	
	@Query("{courseId: ?0}")
	public RequestAcceptance getDetails(String coursedId);
}
