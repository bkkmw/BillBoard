package com.ssafy.billboard.model.service;

import com.ssafy.billboard.model.dto.UserInfoDto;
import com.ssafy.billboard.model.dto.UserSignUpDto;

public interface UserService {
    public int signup(UserSignUpDto userSignUpDto);

    public UserInfoDto getUserInfo(String userId);

}
