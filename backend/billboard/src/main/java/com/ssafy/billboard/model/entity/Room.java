package com.ssafy.billboard.model.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ssafy.billboard.model.dto.RoomDto;
import com.ssafy.billboard.util.BaseTimeEntity;
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
public class Room extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long roomId;

    @ManyToOne
    @JoinColumn(name = "hostId", nullable = false)
    private User host;

    @Column(nullable = false, length = 45)
    private String title;

    @Column(nullable = false)
    private int personLimit;

    @Column(length = 45)
    private String location;

    @Column(length = 20)
    private String lat;

    @Column(length = 20)
    private String lng;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @JsonManagedReference
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Entry> entries = new ArrayList<>();

    public void updateRoom(RoomDto.RoomUpdate roomUpdate){
        if(roomUpdate.getTitle() != null)
            this.title = roomUpdate.getTitle();
        if(roomUpdate.getPersonLimit() != 0)
            this.personLimit = roomUpdate.getPersonLimit();
        if(roomUpdate.getLocation() != null)
            this.location = roomUpdate.getLocation();
        if(roomUpdate.getLat() != null)
            this.lat = roomUpdate.getLat();
        if(roomUpdate.getLng() != null)
            this.lng = roomUpdate.getLng();
        if(roomUpdate.getDate() != null)
            this.date = roomUpdate.getDate();
    }
}
