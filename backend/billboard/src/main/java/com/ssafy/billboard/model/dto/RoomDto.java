package com.ssafy.billboard.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.Date;

public class RoomDto {
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RoomInput {
        private String hostId;
        private String title;
        private int personLimit;
        private String location;
        private Date date;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RoomUpdate {
        private String title;
        private int personLimit;
        private String location;
        private Date date;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ReplyInput {
        private int roomId;
        private String content;
        private String userId;
    }
}
