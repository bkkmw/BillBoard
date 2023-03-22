package com.ssafy.billboard.controller;

import com.ssafy.billboard.model.dto.UserDto;
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

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@Tag(name="[User] User API")
@Slf4j
@RequiredArgsConstructor
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    @Operation(summary = "User sign up", description = "Sign up")
    @PostMapping
    public ResponseEntity<?> signup(@RequestBody UserDto.UserSignUpDto userSignUpDto) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();

        logger.trace("user SignUp : {}", userSignUpDto.getUserId());

        int res = userService.signup(userSignUpDto);

        status = (res >= 0) ? HttpStatus.OK : HttpStatus.CONFLICT;

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @Operation(summary = "Get user info", description = "Get user info by user's id")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserInfo(@PathVariable("userId") String userId){
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();

        logger.trace("find user : {}", userId);

        UserDto.UserInfoDto userInfoDto = userService.getUserInfo(userId);

        if(userInfoDto == null) {
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }

        resultMap.put("userInfo", userInfoDto);
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @Operation(summary = "Delete User", description = "delete user by user id")
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") String userId) {
        HttpStatus status = null;
//        Map<String, Object> resultMap = new HashMap<>();

        logger.trace("delete user : {}", userId);

        int res = userService.deleteUser(userId);

        status = (res >= 0)? HttpStatus.OK : HttpStatus.NOT_FOUND;

        return new ResponseEntity<Void>(status);
    }

    @Operation(summary = "login", description = "login")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDto.UserLoginDto userLoginDto) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();

        logger.trace("login : {}, {}", userLoginDto.getUserId(), userLoginDto.getPassword());

        // Type should be changed
        UserDto.UserInfoDto userInfoDto = userService.login(userLoginDto);

        if(userInfoDto == null){
            return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
        }

        status = HttpStatus.OK;
        resultMap.put("userInfo", userInfoDto);

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @Operation(summary = "logout", description = "logout")
    @PostMapping("/logout/{userId}")
    public ResponseEntity<?> logout(@PathVariable("userId") String userId) {
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();

        logger.trace("logtout : {}, {}", userId);

        int res = userService.logout(userId);

        status = (res >= 0) ? HttpStatus.OK : HttpStatus.NOT_FOUND;

        return new ResponseEntity<Void>(status);
    }
}
