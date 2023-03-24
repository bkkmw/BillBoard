package com.ssafy.billboard.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

public class HistoryDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class HistoryInputDto {
        private int gameId;
        private List<String> users;
        private List<String> winners;
        private int playTime;
    }
}
