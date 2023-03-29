package com.ssafy.billboard.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="review")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@IdClass(ReviewID.class)
public class Review {

    @Id
    @Column(nullable = false, updatable = false)
    private int gameId;

    @Id
    @Column(nullable = false)
    private String userId;

   @Column()
   private double rating;

    @Column()
    private String comment;

    @Column(nullable = false)
    private String name;
}
