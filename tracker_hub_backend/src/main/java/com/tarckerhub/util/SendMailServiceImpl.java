package com.tarckerhub.util;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.tarckerhub.model.MailInfo;

@Service
public class SendMailServiceImpl implements SendMailService {
	private final JavaMailSender javaMailSender;

	public SendMailServiceImpl(JavaMailSender javaMailSender) {
		this.javaMailSender = javaMailSender;
	}

	@Override
	public void sendMail(MailInfo mail) {

		SimpleMailMessage msg = new SimpleMailMessage();
		msg.setTo(mail.getRecipient(), mail.getRecipient());

		msg.setSubject(mail.getSubject());
		msg.setText(mail.getMessage());

		javaMailSender.send(msg);
	}

	@Override
	public void sendMailWithAttachments(MailInfo mail) throws MessagingException {
		MimeMessage msg = javaMailSender.createMimeMessage();

		MimeMessageHelper helper = new MimeMessageHelper(msg, true);

		helper.setTo("to_@email");

		helper.setSubject("Testing from Spring Boot");

		helper.setText("Find the attached image", true);

		helper.addAttachment("hero.jpg", new ClassPathResource("hero.jpg"));

		javaMailSender.send(msg);
	}

}
