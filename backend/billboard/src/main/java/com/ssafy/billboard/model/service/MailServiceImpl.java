package com.ssafy.billboard.model.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

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
            StringBuilder sb = new StringBuilder();
            sb.append("<div style=\"background-color: #ffea00; padding: 15px\">");
            sb.append("<h1>BILLBOARD</h1>");
            sb.append("<div style=\"background-color: #ffffff; font-size: large; padding: 2px; margin: 2px\">\n" +
                    "        <div>요청하신 이메일 인증번호 입니다.</div>\n" +
                    "        <div>회원가입 창에서 인증번호를 10분 내에 입력해주세요.</div>\n" +
                    "        <div style=\"font-weight: bold\">인증번호 : " + authKey + "</div>\n" +
                    "      </div>");
            sb.append("</div>");

            messageHelper.setText(sb.toString(), true);
//            messageHelper.setText("HTML CODES", true);

            mailSender.send(message);
            return 0;
        } catch(Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public int sendIdMail(String email, String userId) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
            messageHelper.setSubject("ID 찾기");
            messageHelper.setTo(email);
//            messageHelper.setText(String.format("Your ID : %s", userId));
            StringBuilder sb = new StringBuilder();
            sb.append("<div style=\"background-color: #ffea00; padding: 15px\">");
            sb.append("<h1>BILLBOARD</h1>");
            sb.append("<div style=\"background-color: #ffffff; font-size: large; padding: 2px; margin: 2px\">\n" +
                    "<div>요청하신 BILLBOARD ID 입니다.</div>\n" +
                    "<div>비밀번호가 기억나지 않으면 홈페이지의 비밀번호 찾기 기능을 이용하여 주세요</div>\n" +
                    "<div style=\"font-weight: bold\">회원님의 ID : " + userId + "</div>\n" +
                    "</div>");
            sb.append("</div>");

            messageHelper.setText(sb.toString(), true);

            mailSender.send(message);
            return 0;
        } catch(Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public int sendPwMail(String email, String password) {
        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(message, true, "UTF-8");
            messageHelper.setSubject("PW 찾기");
            messageHelper.setTo(email);
//            messageHelper.setText(String.format("Your PW : %s", password));
            StringBuilder sb = new StringBuilder();
            sb.append("<div style=\"background-color: #ffea00; padding: 15px\">");
            sb.append("<h1>BILLBOARD</h1>");
            sb.append("<div style=\"background-color: #ffffff; font-size: large; padding: 2px; margin: 2px\">\n" +
                    "<div>요청하신 BILLBOARD 비밀번호 입니다.</div>\n" +
                    "<div style=\"font-weight: bold\">임시비밀번호 : " + password + "</div>\n" +
                    "</div>");
            sb.append("</div>");

            messageHelper.setText(sb.toString(), true);

            mailSender.send(message);
            return 0;
        } catch(Exception e) {
            e.printStackTrace();
            return -1;
        }
    }
}
