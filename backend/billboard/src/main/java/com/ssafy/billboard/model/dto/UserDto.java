package com.ssafy.billboard.model.dto;

import lombok.*;

import java.util.List;

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
        private int isFollowing;
    }

    @Getter
    @AllArgsConstructor
    @Builder
    public static class UserWithHistoryDto {
        private UserInfoDto userInfoDto;
        private List<BoardGameDto.BoardGame> recentGames;
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

    @Getter
    @AllArgsConstructor
    @Builder
    public static class UserWithTokenDto {
        private String accessToken;
        private String refreshToken;
        private UserInfoDto userInfoDto;
    }
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserIdDto{
        private String Id;
    }

}
