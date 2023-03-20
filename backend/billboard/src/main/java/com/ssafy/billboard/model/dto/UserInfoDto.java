package com.ssafy.billboard.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfoDto {

    private String userId;
    private String nickname;
    private String email;
    private int experience;
    private int matchCount;
    private int winCount;
}
