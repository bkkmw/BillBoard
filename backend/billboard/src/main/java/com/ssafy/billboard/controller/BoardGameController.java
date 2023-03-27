package com.ssafy.billboard.controller;


import com.ssafy.billboard.model.service.BoardGameService;
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
@RequestMapping("/api/boardgames")
@Tag(name="[Board] BoardGame API")
@Slf4j
@RequiredArgsConstructor
public class BoardGameController {

    private static final Logger logger = LoggerFactory.getLogger(BoardGameController.class);
    private final BoardGameService boardGameService;

//    @Operation(summary = "User sign up", description = "Sign up")
//    @PostMapping
//    public ResponseEntity<?> signup(@RequestBody UserDto.UserSignUpDto userSignUpDto) {
//        HttpStatus status = null;
//        Map<String, Object> resultMap = new HashMap<>();
//
//        logger.trace("user SignUp : {}", userSignUpDto.getUserId());
//
//        int res = userService.signup(userSignUpDto);
//
//        status = (res >= 0) ? HttpStatus.OK : HttpStatus.CONFLICT;
//
//        return new ResponseEntity<Map<String, Object>>(resultMap, status);
//    }

}
