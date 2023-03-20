package com.ssafy.billboard.model.entity;

import com.ssafy.billboard.model.dto.RoomDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="room")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@DynamicInsert
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int roomId;

    private String title;

    private int personCount;

    private int personLimit;

    private String location;

    @Temporal(TemporalType.DATE)
    private Date date;

    private String hostId;

    private Room(RoomBuilder builder) {
        this.roomId = builder.roomId;
        this.title = builder.title;
        this.personCount = builder.personCount;
        this.personLimit = builder.personLimit;
        this.location = builder.location;
        this.date = builder.date;
        this.hostId = builder.hostId;
    }

    public static class RoomBuilder {
        private int roomId;

        private String title;

        private int personCount;

        private int personLimit;

        private String location;

        private Date date;

        private String hostId;

        public RoomBuilder(RoomDto roomDto){
            this.title = roomDto.getTitle();
            this.personLimit = roomDto.getPersonLimit();
            this.hostId = roomDto.getHostId();
        }

        public RoomBuilder setRoomId(int roomId) {
            this.roomId = roomId;
            return this;
        }

        public RoomBuilder setPersonCount(int personCount) {
            this.personCount = personCount;
            return this;
        }

        public RoomBuilder setLocation(String location) {
            this.location = location;
            return this;
        }

        public RoomBuilder setDate(Date date) {
            this.date = date;
            return this;
        }

        public Room build(){
            return new Room(this);
        }
    }
}
