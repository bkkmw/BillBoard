package com.ssafy.billboard.controller;

import com.ssafy.billboard.model.dto.MailDto;
import com.ssafy.billboard.model.dto.UserDto;
import com.ssafy.billboard.model.service.UserService;
import com.ssafy.billboard.util.SecurityUtil;
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
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
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
        logger.trace("user SignUp : {}", userSignUpDto.getUserId());

        int res = userService.signup(userSignUpDto);

        status = (res >= 0) ? HttpStatus.OK : HttpStatus.CONFLICT;

        return new ResponseEntity<Void>(status);
    }

    @Operation(summary = "Get user info", description = "Get user info by user's id")
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserInfo(@PathVariable("userId") String userId){
        HttpStatus status = null;
        Map<String, Object> resultMap = new HashMap<>();
        logger.trace("find user : {}", userId);

        String curUserId = SecurityUtil.getUserId();
        logger.debug("current user ID : {}", curUserId);

        UserDto.UserWithHistoryDto userWithHistoryDto = userService.getUserInfo(curUserId, userId);

        if(userWithHistoryDto == null) {
            return new ResponseEntity<Void>(HttpStatus.NOT_FOUND);
        }

        resultMap.put("userInfo", userWithHistoryDto.getUserInfoDto());
        resultMap.put("recentGames", userWithHistoryDto.getRecentGames());
        status = HttpStatus.OK;
        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @Operation(summary = "Delete User", description = "delete user by user id")
    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable("userId") String userId) {
        HttpStatus status = null;
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
        UserDto.UserWithTokenDto userWithTokenDto = userService.login(userLoginDto);

        if(userWithTokenDto == null){
            return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);
        }

        status = HttpStatus.OK;
        resultMap.put("userInfo", userWithTokenDto.getUserInfoDto());
        resultMap.put("accessToken", userWithTokenDto.getAccessToken());
        resultMap.put("refreshToken", userWithTokenDto.getRefreshToken());

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @Operation(summary = "logout", description = "logout")
    @PostMapping("/logout/{userId}")
    public ResponseEntity<?> logout(@PathVariable("userId") String userId) {
        HttpStatus status = null;
        logger.trace("logtout : {}, {}", userId);

        int res = userService.logout(userId);

        status = (res >= 0) ? HttpStatus.OK : HttpStatus.NOT_FOUND;

        return new ResponseEntity<Void>(status);
    }

    @Operation(summary = "check ID duplication", description = ".")
    @GetMapping("/check-id/{userId}")
    public ResponseEntity<?> duplicatedId(@PathVariable("userId") String userId) {
        HttpStatus status = null;
        logger.trace("check ID : {}", userId);

        int res = userService.duplicatedId(userId);

        status = (res == 0) ? HttpStatus.OK : HttpStatus.CONFLICT;
        return new ResponseEntity<Void>(status);
    }

    @Operation(summary = "Send email with auth key for signup", description = ".")
    @PostMapping("/email-auth")
    public ResponseEntity<?> sendAuthEmail(@RequestBody MailDto.MailAuthDto mailAuthDto) {
        HttpStatus status;
        logger.trace("email auth request");

        int res = userService.sendAuthEmail(mailAuthDto.getEmail());

        logger.info("email sent with res : {}", res);
        
        status = (res == 0)? HttpStatus.OK : (res == -2)? HttpStatus.CONFLICT : HttpStatus.INTERNAL_SERVER_ERROR;

        return new ResponseEntity<Void>(status);
    }

    @Operation(summary = "check auth key", description = ".")
    @PostMapping("/check-authkey")
    public ResponseEntity<?> checkAuthKey(@RequestBody MailDto.MailCheckDto mailCheckDto) {
        HttpStatus status;
        logger.trace("check email auth key");

        int res = userService.checkAuthKey(mailCheckDto);

        status = (res == 0) ? HttpStatus.OK :
                (res == -1) ? HttpStatus.UNAUTHORIZED :
                        (res == -2) ? HttpStatus.GONE :
                                HttpStatus.NOT_FOUND;

        return new ResponseEntity<Void>(status);
    }

    @Operation(summary = "find user id by email", description = ".")
    @GetMapping("/find-id/{email}")
    public ResponseEntity<?> findId(@PathVariable("email") String email) {
        HttpStatus status;
        logger.trace("find ID by email : {}", email);

        int res = userService.findId(email);

        status = (res == 0) ? HttpStatus.OK
                : (res == -1) ? HttpStatus.INTERNAL_SERVER_ERROR
                : HttpStatus.NOT_FOUND;

        return new ResponseEntity<Void>(status);
    }

    @Operation(summary = "generate new password", description = ".")
    @PostMapping("/find-password")
    public ResponseEntity<?> findPassword(@RequestBody UserDto.UserFindPwDto userFindPwDto) {
        HttpStatus status;
        logger.trace("find password");

        int res = userService.findPw(userFindPwDto);

        status = (res == 0) ? HttpStatus.OK
                : (res == -1) ? HttpStatus.INTERNAL_SERVER_ERROR
                : HttpStatus.NOT_FOUND;

        return new ResponseEntity<Void>(status);
    }

    @Operation(summary = "check user id & pw", description = ".")
    @PostMapping("/check-password")
    public ResponseEntity<?> confirmPw(@RequestBody UserDto.UserLoginDto userLoginDto) {
        HttpStatus status;
        Map<String, Object> resultMap = new HashMap<>();
        logger.trace("check user password : {}, {}", userLoginDto.getUserId(), userLoginDto.getPassword());

        UserDto.UserInfoDto userInfoDto = userService.confirmPw(userLoginDto);

        if(userInfoDto == null) return new ResponseEntity<Void>(HttpStatus.UNAUTHORIZED);

        status = HttpStatus.OK;
        resultMap.put("userInfo", userInfoDto);

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }

    @Operation(summary = "search user by keyword(userId)", description = ".")
    @GetMapping("/search/{keyword}")
    public ResponseEntity<?> searchByUserId(@PathVariable("keyword") String keyword) {
        HttpStatus status;
        Map<String, Object> resultMap = new HashMap<>();
        logger.trace("search user by : {}", keyword);

        List<UserDto.UserInfoDto> userInfoList = userService.searchByUserId(keyword);

        if(userInfoList == null) return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        if(userInfoList.size() == 0) return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);

        resultMap.put("userList", userInfoList);
        status = HttpStatus.OK;

        return new ResponseEntity<Map<String, Object>>(resultMap, status);
    }
}
