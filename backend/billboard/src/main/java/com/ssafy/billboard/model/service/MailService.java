package com.ssafy.billboard.model.service;

public interface MailService {
    int sendAuthMail(String email, String authKey);

    int sendIdMail(String email, String userId);

    int sendPwMail(String email, String password);
}
