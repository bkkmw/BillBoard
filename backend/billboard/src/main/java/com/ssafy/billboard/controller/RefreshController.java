package com.ssafy.billboard.controller;

import com.ssafy.billboard.model.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/refresh")
@Tag(name="[Token] Refresh token API")
@Slf4j
@RequiredArgsConstructor
public class RefreshController {

    private final Logger logger = LoggerFactory.getLogger(RefreshController.class);
    private final UserService userService;

    @Operation(summary = "refresh access token by refresh token", description = "put token at header")
    @PostMapping
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();
        String authHeader = request.getHeader("Authorization");
        if(StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
            logger.info("REFRESH TOKEN : {}", authHeader);
            String newToken = userService.refreshToken(authHeader.substring(7));

            if (newToken == null) {
                logger.info("Invalid token or no such user found");
                return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
            }
            if(newToken.startsWith("EXPIRED")) {
                logger.info("Expired token : {}", newToken);
                logger.info("user's id : {}", newToken.substring(9));
                userService.logout(newToken.substring(9));
                return new ResponseEntity<Void>(HttpStatus.GONE);
            }

            resultMap.put("accessToken", newToken);
            return new ResponseEntity<Map>(resultMap, HttpStatus.OK);
        }
        return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
    }
}
