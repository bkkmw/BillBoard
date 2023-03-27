package com.ssafy.billboard.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="follow")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long followId;

    @Column(nullable = false)
    private String fromUserId;

    @Column(nullable = false)
    private String toUserId;
}
