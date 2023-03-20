package com.ssafy.billboard.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {

    private String userId;
    private String password;
    private String nickname;
    private String email;
    private String state;
    private int matchCount;
    private int winCount;
    private int experience;
    private String refreshToken;
}
