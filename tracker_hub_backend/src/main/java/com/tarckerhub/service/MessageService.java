package com.tarckerhub.service;

import java.io.IOException;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tarckerhub.model.Messages;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MessageService {
	public Messages gson(String messages) {
		Messages JSONMessages = new Messages();
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JSONMessages = objectMapper.readValue(messages, Messages.class);
		} catch (IOException e) {
			log.error("Assignements Service Error "+new Date()+". \n"+e.toString());
		}
		return JSONMessages;
	}
}
