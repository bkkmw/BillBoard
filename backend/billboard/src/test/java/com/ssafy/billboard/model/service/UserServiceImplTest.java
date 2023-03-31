package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.entity.MailAuth;
import com.ssafy.billboard.model.repository.MailAuthRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceImplTest {

    @Autowired
    MailAuthRepository mailAuthRepository;

    @Test
    public void mailAuthTest() {
        String email = "dsaf@asf.com";
        assertEquals(true, mailAuthRepository.existsById("dsaf@asf.com"));
        MailAuth mailAuth = mailAuthRepository.findById(email).get();
        int res = (mailAuth == null) ? -1 : 0;
        assertEquals(0, res);
    }
}