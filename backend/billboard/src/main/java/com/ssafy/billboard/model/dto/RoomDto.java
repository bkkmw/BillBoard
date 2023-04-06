package com.ssafy.billboard.model.dto;

import com.ssafy.billboard.model.entity.Entry;
import com.ssafy.billboard.model.entity.Reply;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public class RoomDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class RoomInput {
        private String hostId;
        private String title;
        private int personLimit;
        private String location;
        private String lat;
        private String lng;
        private Date date;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class RoomUpdate {
        private String title;
        private int personLimit;
        private String location;
        private String lat;
        private String lng;
        private Date date;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class RoomInfo {
        private long roomId;
        private String hostId;
        private String title;
        private int personCount;
        private int personLimit;
        private String location;
        private String lat;
        private String lng;
        private Date date;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class RoomDetailInfo {
        private RoomInfo roomInfo;
        private List<EntryInfo> entries;
        private List<ReplyInfo> replies;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class RoomReservationInfo {
        private RoomInfo roomInfo;
        private List<EntryInfo> entries;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ReplyInput {
        private String content;
        private String userId;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ReplyInfo {
        private long replyId;
        private String content;
        private String userId;
        private LocalDateTime createdTime;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class EntryInput {
        private String userId;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class EntryInfo {
        private String userId;
    }
}
