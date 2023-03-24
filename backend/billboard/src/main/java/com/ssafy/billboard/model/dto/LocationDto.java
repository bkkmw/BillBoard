package com.ssafy.billboard.model.dto;

import com.ssafy.billboard.model.entity.Entry;
import com.ssafy.billboard.model.entity.Reply;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

public class LocationDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class SidoCodeInfo {
        private String sidoCode;
        private String sidoName;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class GugunCodeInfo {
        private String gugunCode;
        private String gugunName;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class DongCodeInfo {
        private String dongCode;
        private String dongName;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class Coordinate{
        private String lat;
        private String lng;
    }
}
