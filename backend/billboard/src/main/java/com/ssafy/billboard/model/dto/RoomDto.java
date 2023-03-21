package com.ssafy.billboard.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

public class RoomDto {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RoomInput {
        private String title;
        private int personLimit;
        private String location;
        private Date date;
        private String hostId;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RoomInfo {
        private int roomId;
        private String title;
        private int personCount;
        private int personLimit;
        private String location;
        private Date date;
        private String hostId;
    }
}
