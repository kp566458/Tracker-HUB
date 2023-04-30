package com.tarckerhub.util;

import javax.mail.MessagingException;

import com.tarckerhub.model.MailInfo;

public interface SendMailService {
	void sendMail(MailInfo mail);

	void sendMailWithAttachments(MailInfo mail) throws MessagingException;
}
