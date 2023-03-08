package com.tarckerhub.resposit;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tarckerhub.model.Chat;

public interface ChatRepository extends MongoRepository<Chat, String> {

}
