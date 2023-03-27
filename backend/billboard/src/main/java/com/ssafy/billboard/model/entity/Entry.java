package com.ssafy.billboard.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="entry")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class Entry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long entryId;

    @ManyToOne
    @JoinColumn(name = "roomId", nullable = false)
    private Room room;

    @Column(nullable = false)
    private String userId;
}
