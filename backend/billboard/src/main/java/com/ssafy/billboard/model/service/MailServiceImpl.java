package com.ssafy.billboard.model.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;


@Service
@RequiredArgsConstructor
@Slf4j
public class MailServiceImpl implements MailService{

    private static final Logger logger = LoggerFactory.getLogger(MailServiceImpl.class);
    private final JavaMailSender mailSender;

    @Override
    public int sendAuthMail(String email, String authKey) {
        MimeMessage message = mailSender.createMimeMessage();
        try{
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
            messageHelper.setSubject("이메일 인증");
            messageHelper.setTo(email);
            messageHelper.setText(String.format("Your Auth Key : %s", authKey));
//            messageHelper.setText("HTML CODES", true);

            mailSender.send(message);
            return 0;
        } catch(Exception e) {
            e.printStackTrace();
            return -1;
        }
    }
}
