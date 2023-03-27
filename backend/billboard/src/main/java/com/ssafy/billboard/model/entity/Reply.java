package com.ssafy.billboard.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="reply")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long replyId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roomId", nullable = false)
    private Room room;

    @Column
    private String content;

    @Column(nullable = false)
    private String userId;

}
