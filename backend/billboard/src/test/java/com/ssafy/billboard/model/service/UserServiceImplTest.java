package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.UserSignUpDto;
import com.ssafy.billboard.model.entity.User;
import com.ssafy.billboard.model.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Service;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Service
public class UserServiceImplTest {

    @Autowired
    public UserRepository userRepository;

    @Test
    public void signup() {

        UserSignUpDto userSignUpDto = new UserSignUpDto();

        userSignUpDto.setUserId("Test");
        userSignUpDto.setPassword("1234");
        userSignUpDto.setNickname("TESTER");
        userSignUpDto.setEmail("ee@aa.com");

        userRepository.save(new User.UserBuilder(userSignUpDto).build());
        System.out.println("HERE");
        assertEquals(1, 1);

    }
}