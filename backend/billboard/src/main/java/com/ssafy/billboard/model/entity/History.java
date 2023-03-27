package com.ssafy.billboard.model.entity;

import com.ssafy.billboard.util.BaseTimeEntity;
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
public class History extends BaseTimeEntity {

    @Id
    @Column(name = "userId")
    private String userId;

    @Id
    @Column(name = "gameId")
    private int gameId;

    @Column(name = "count")
    private int count;


    public void updateCount() {
        this.count = this.count + 1;
    }
}
