package com.tarckerhub.resposit;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tarckerhub.model.GroupDiscussion;

public interface GroupDiscussionRepository extends MongoRepository<GroupDiscussion, String>{

	List<GroupDiscussion> findByGroupId(String groupId);
}
