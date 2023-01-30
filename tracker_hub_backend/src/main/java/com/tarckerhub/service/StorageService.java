package com.tarckerhub.service;


import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class StorageService {
	
	private String bucketName = "trackerhuub";
	
	@Autowired
	private AmazonS3 s3Client;

	public String uploadFile(MultipartFile file) {
		File fileObject = convertMultipartFiletoFile(file);
		String fileName = System.currentTimeMillis()+"_"+file.getOriginalFilename();
		s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObject));
		fileObject.delete();
		return fileName;
	}
	
	private File convertMultipartFiletoFile(MultipartFile file) {
	File convertedFile = new File(file.getOriginalFilename());
		try(FileOutputStream fileOutputStream = new FileOutputStream(convertedFile)) {
			fileOutputStream.write(file.getBytes());
		} catch (IOException e) {
			log.error("Cannot convert multipartFile to file", e);
		}
		return convertedFile;
	}
	

}
