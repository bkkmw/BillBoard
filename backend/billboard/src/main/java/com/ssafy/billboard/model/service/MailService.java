package com.ssafy.billboard.model.service;

public interface MailService {
    int sendAuthMail(String email, String authKey);
}
