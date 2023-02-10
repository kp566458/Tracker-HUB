package com.tarckerhub.resposit;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tarckerhub.model.FollowRequest;

public interface CourseRequestRepository extends MongoRepository<FollowRequest, String> {

	@Query("{courseId:?0, useremail:?1}")
	public FollowRequest getExistedDetails(String courseId, String userEmail);

	@Query("{requestId:?0}")
	public FollowRequest findByRequestId(String requestId);

	@Query("{courseId:?0, authentication:?1}")
	public List<FollowRequest> findByRequestIdAndAuthenctication(String courseId, String authentication);

	@Query(" authenctication:?0}")
	public List<FollowRequest> findByCourseId(String courseId);

	@Query(value = "{'courseId':?0, 'authentication':?1}", fields = "{ 'useremail': 1}")
	public List<FollowRequest> findUsersByRequestIdAndAuthenctication(String courseId, String authentication);

}
