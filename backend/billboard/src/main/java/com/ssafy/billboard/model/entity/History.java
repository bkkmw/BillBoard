package com.ssafy.billboard.model.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="history")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@IdClass(HistoryID.class)
public class History {

    @Id
    @Column(name = "userId")
    private String userId;

    @Id
    @Column(name = "gameId")
    private int gameId;

    @Column(name = "count")
    private int count;

    @Column(name = "lastPlayTime")
    private Timestamp lastPlayTime;

    public void update(Timestamp timestamp) {
        this.count = this.count + 1;
        this.lastPlayTime = timestamp;
    }
}
