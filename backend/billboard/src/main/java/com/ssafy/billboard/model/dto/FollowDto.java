package com.ssafy.billboard.model.dto;

import lombok.*;

public class FollowDto {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class FollowInput {
        private String fromUserId;
        private String toUserId;
    }
}
