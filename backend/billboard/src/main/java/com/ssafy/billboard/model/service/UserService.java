package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.MailDto;
import com.ssafy.billboard.model.dto.UserDto;

public interface UserService {
    int signup(UserDto.UserSignUpDto userSignUpDto);

    UserDto.UserInfoDto getUserInfo(String userId);

    int modifyUserInfo(UserDto.UserSignUpDto userSignUpDto);

    int deleteUser(String userId);

    UserDto.UserInfoDto login(UserDto.UserLoginDto userLoginDto);
    int logout(String userId);

    int duplicatedId(String userId);

    int sendAuthEmail(String email);

    int checkAuthKey(MailDto.MailCheckDto mailCheckDto);

    int findId(String email);

    int findPw(UserDto.UserFindPwDto userFindPwDto);

    int increaseCount(String userId, boolean isWin);
}
