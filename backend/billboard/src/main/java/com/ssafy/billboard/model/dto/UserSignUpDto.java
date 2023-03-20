package com.ssafy.billboard.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSignUpDto {

    private String userId;
    private String password;
    private String nickname;
    private String email;
}
