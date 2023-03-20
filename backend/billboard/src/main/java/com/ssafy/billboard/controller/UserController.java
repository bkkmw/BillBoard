package com.ssafy.billboard.controller;

import com.ssafy.billboard.model.dto.UserDto;
import com.ssafy.billboard.model.dto.UserInfoDto;
import com.ssafy.billboard.model.dto.UserSignUpDto;
import com.ssafy.billboard.model.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@Tag(name="[User] User API")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @Operation(summary = "User sign up", description = "Sign up")
    @PostMapping
    public ResponseEntity<?> signup(@RequestBody UserSignUpDto userSignUpDto) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();

        logger.trace("user SignUp : {}", userSignUpDto);

        int res = userService.signup(userSignUpDto);

        status = (res > 0) ? HttpStatus.OK : HttpStatus.CONFLICT;

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @Operation(summary = "Get user info", description = "Get user info by user's id")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserInfo(@PathVariable("userId") String userId){
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();

        logger.trace("find user : {}", userId);

        UserInfoDto userInfoDto = userService.getUserInfo(userId);

        if(userInfoDto == null) {
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }

        resultMap.put("userInfo", userInfoDto);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
}
