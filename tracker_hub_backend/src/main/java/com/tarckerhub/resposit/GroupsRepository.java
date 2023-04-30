package com.tarckerhub.resposit;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tarckerhub.model.Groups;

public interface GroupsRepository extends MongoRepository<Groups, String> {
	
	List<Groups> findByCreatedBy(String createdBy);
	
	List<Groups> findByGroupId(String groupId);

	Optional<Groups> findById(String id);

}
