package com.ssafy.billboard.model.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="follow")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class History {
    @Id
    @Column(name = "historyId")
    private long historyId;

    @Column(name = "userId")
    private String userId;

    @Column(name = "gameId")
    private long gameId;

    @Column(name = "count")
    private int count;

    @Column(name = "isWin")
    private boolean isWin;

    @Column(name = "lastPlayTime")
    private Timestamp lastPlayTime;
}
