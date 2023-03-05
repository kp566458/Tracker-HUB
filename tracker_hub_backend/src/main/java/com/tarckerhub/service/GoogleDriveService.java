package com.tarckerhub.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.security.GeneralSecurityException;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonFactory;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;

@Service
public class GoogleDriveService {

//	private static final String APPLICATION_NAME = "My Spring Boot App";
//	private static final JacksonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();
//	private static final List<String> SCOPES = Collections.singletonList(DriveScopes.DRIVE_FILE);
//
//	private final HttpTransport httpTransport;
//	private final Credential credential;
//
//	public GoogleDriveService() throws IOException, GeneralSecurityException {
//		this.httpTransport = GoogleNetHttpTransport.newTrustedTransport();
//		this.credential = loadCredential();
//	}
//
//	private Credential loadCredential() throws IOException {
//		GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY,
//				new InputStreamReader(getClass().getResourceAsStream("/google/client_secret.json")));
//
//		GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(httpTransport, JSON_FACTORY,
//				clientSecrets, SCOPES).setDataStoreFactory(new FileDataStoreFactory(new File("tokens")))
//				.setAccessType("offline").build();
//
//		return new AuthorizationCodeInstalledApp(flow, new LocalServerReceiver()).authorize("user");
//	}
//
//	public String uploadFile(File file, String folderId) throws IOException {
//		File fileMetadata = new File();
//		fileMetadata.setName(file.getName());
//		fileMetadata.setParents(Collections.singletonList(folderId));
//		FileContent mediaContent = new FileContent(null, file);
//		Drive drive = new Drive.Builder(httpTransport, JSON_FACTORY, credential).setApplicationName(APPLICATION_NAME)
//				.build();
//		File uploadedFile = drive.files().create(fileMetadata, mediaContent).setFields("id").execute();
//		return uploadedFile.getId();
//	}
//
//	public File downloadFile(String fileId) throws IOException {
//		Drive drive = new Drive.Builder(httpTransport, JSON_FACTORY, credential).setApplicationName(APPLICATION_NAME)
//				.build();
//		OutputStream outputStream = new ByteArrayOutputStream();
//		drive.files().get(fileId).executeMediaAndDownloadTo(outputStream);
//		InputStream inputStream = new ByteArrayInputStream(((ByteArrayOutputStream) outputStream).toByteArray());
//		return new File(fileId, inputStream);
//	}
}
