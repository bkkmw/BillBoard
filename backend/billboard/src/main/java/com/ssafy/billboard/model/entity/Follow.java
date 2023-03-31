package com.ssafy.billboard.model.entity;

import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @ManyToOne
    @JoinColumn(name = "fromUserId", nullable = false)
    private User fromUser;

    @ManyToOne
    @JoinColumn(name = "toUserId", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User toUser;
}
