package com.ssafy.billboard.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ReviewDto {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Review{
        private int gameId;
        private String userId;
        private double rating;
        private String comment;
        private String name;

    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ReviewID{
        private int gameId;
        private String userId;

    }

}
