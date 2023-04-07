package com.ssafy.billboard.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="favorite")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@IdClass(FavoriteID.class)
public class Favorite {

    @Id
    @Column(nullable = false, updatable = false)
    private int gameId;
    @Id
    @Column(nullable = false, updatable = false)
    private String userId;



}
