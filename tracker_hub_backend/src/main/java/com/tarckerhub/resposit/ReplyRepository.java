package com.tarckerhub.resposit;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tarckerhub.model.Reply;

public interface ReplyRepository extends MongoRepository<Reply, String> {

}
