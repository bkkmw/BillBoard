package com.ssafy.billboard.model.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

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
    private int roomId;

    @Column(nullable = false)
    private String title;

    @Column
    private int personCount;

    @Column(nullable = false)
    private int personLimit;

    @Column
    private String location;

    @Column
    @Temporal(TemporalType.DATE)
    private Date date;

    @Column(nullable = false)
    private String hostId;

}
