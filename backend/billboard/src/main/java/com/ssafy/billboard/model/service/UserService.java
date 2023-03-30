package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.MailDto;
import com.ssafy.billboard.model.dto.UserDto;

import java.util.List;

public interface UserService {
    /**
     * sign up
     * @param userSignUpDto userId, password, nickname, email
     * @return -2 for insufficient data, -1 invalid data, 0 for success
     */
    int signup(UserDto.UserSignUpDto userSignUpDto);

    UserDto.UserWithHistoryDto getUserInfo(String fromUserId, String toUserId);

    int modifyUserInfo(UserDto.UserSignUpDto userSignUpDto);

    int deleteUser(String userId);

    UserDto.UserWithTokenDto login(UserDto.UserLoginDto userLoginDto);
    int logout(String userId);

    /**
     * Check id is available
     * @param userId
     * @return -1 for duplicated id, 0 for available id
     */
    int duplicatedId(String userId);

    /**
     * sends email with auth key
     * @param email
     * @return -2 for existing email, -1 for SMTP error, 0 for success
     */
    int sendAuthEmail(String email);

    /**
     * checks auth key with email
     * @param mailCheckDto : email and auth key
     * @return -3 for email not found, -2 for expired key, -1 for incorrect key, 0 for success
     */
    int checkAuthKey(MailDto.MailCheckDto mailCheckDto);

    /**
     * send id to email
     * @param email
     * @return -2 for no such user with email, -1 for SMTP error, 0 for success
     */
    int findId(String email);

    /**
     * send new password to email
     * @param userFindPwDto : email and userid
     * @return -2 for no such user, -1 for SMTP error, 0 for success
     */
    int findPw(UserDto.UserFindPwDto userFindPwDto);

    UserDto.UserInfoDto confirmPw(UserDto.UserLoginDto userLoginDto);

    List<UserDto.UserInfoDto> searchByUserId(String keyword);

    /**
     * generate new access token by refresh token
     * @param refreshToken
     * @return userId(exists, and valid), 'EXPIRED :userId'(expired), NULL(failed)
     */
    String refreshToken(String refreshToken);
}
