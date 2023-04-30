package com.tarckerhub.resposit;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.tarckerhub.model.Course;


public interface CourseRepository extends MongoRepository<Course, String> {

	@Query(value="{courseId:?0}", delete=true)
	void deleteByCourseId(String serilalId);

	@Query("{'courseId':?0}")
	Course findbyCourseId(String courseId);

	


}
