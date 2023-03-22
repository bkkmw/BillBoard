package com.ssafy.billboard.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

public class UserDto {

    @Getter
    @AllArgsConstructor
    @Builder
    public static class UserInfoDto {

        private String userId;
        private String nickname;
        private String email;
        private int experience;
        private int matchCount;
        private int winCount;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class UserLoginDto {
        private String userId;
        private String password;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class UserSignUpDto {

        private String userId;
        private String password;
        private String nickname;
        private String email;
    }


}
