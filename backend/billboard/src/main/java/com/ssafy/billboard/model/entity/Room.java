package com.ssafy.billboard.model.entity;

import com.ssafy.billboard.model.dto.RoomDto;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="room")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long roomId;

    @Column(nullable = false)
    private String hostId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private int personLimit;

    @Column
    private String location;

    @Column
    @Temporal(TemporalType.DATE)
    private Date date;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Entry> entries = new ArrayList<>();

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Reply> replies = new ArrayList<>();

    public void update(RoomDto.RoomUpdate roomUpdate){
        if(roomUpdate.getTitle() != null)
            this.title = roomUpdate.getTitle();
        if(roomUpdate.getPersonLimit() != 0)
            this.personLimit = roomUpdate.getPersonLimit();
        if(roomUpdate.getLocation() != null)
            this.location = roomUpdate.getLocation();
        if(roomUpdate.getDate() != null)
            this.date = roomUpdate.getDate();
    }
}
