package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.UserInfoDto;
import com.ssafy.billboard.model.dto.UserLoginDto;
import com.ssafy.billboard.model.dto.UserSignUpDto;

public interface UserService {
    public int signup(UserSignUpDto userSignUpDto);

    public UserInfoDto getUserInfo(String userId);

    public int modifyUserInfo(UserSignUpDto userSignUpDto);

    public int deleteUser(String userId);

    public UserInfoDto login(UserLoginDto userLoginDto);
    public int logout(String userId);
}
