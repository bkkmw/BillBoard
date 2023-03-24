package com.ssafy.billboard.model.entity;

import com.ssafy.billboard.model.dto.RoomDto;
import lombok.*;

import javax.persistence.*;
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

    @Column
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "roomId")
    private List<Entry> entries;

    @Column
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "roomId")
    private List<Reply> replies;

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
