package com.ssafy.billboard.model.dto;

import lombok.*;

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
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserLoginDto {
        private String userId;
        private String password;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserSignUpDto {

        private String userId;
        private String password;
        private String nickname;
        private String email;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserFindPwDto {
        private String userId;
        private String email;
    }
}
