package com.ssafy.billboard.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class FollowDto {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class FollowInput {
        private String fromUserId;
        private String toUserId;
    }
}
