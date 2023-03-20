package com.ssafy.billboard.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@Tag(name="[User] User API")
public class UserController {

    @Operation(summary = "Swagger Test", description = "[Test] this API is created for swagger test, soon will be removed")
    @GetMapping("/test")
    public ResponseEntity<?> swaggerTest(){
        HttpStatus status = null;

        return new ResponseEntity<Void>(status);
    }
}
