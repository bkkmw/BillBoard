package com.ssafy.billboard.model.entity;

import com.ssafy.billboard.util.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="history")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@IdClass(HistoryID.class)
public class History extends BaseTimeEntity {

    @Id
    @Column(name = "userId", length = 45)
    private String userId;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gameId")
    private BoardGame boardGame;

    @Column(name = "count")
    private int count;


    public void updateCount() {
        this.count = this.count + 1;
    }
}
