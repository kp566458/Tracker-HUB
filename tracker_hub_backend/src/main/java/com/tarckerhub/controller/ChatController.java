package com.tarckerhub.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tarckerhub.resposit.ChatRepository;

@RestController
@RequestMapping("/chat")
public class ChatController {
	
	@Autowired
	private ChatRepository chatRepository;

}
