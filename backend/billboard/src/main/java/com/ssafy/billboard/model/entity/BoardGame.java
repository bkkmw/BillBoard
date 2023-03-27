package com.ssafy.billboard.model.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="boardgameInfo")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class BoardGame {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false)
    private long gameId; //db 수정 해야함 , long + 이름

    @Column(nullable = false)
    private String primary;

    @Column(nullable = false)
    private String thumbnail;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private int yearpublished;


    @Column(nullable = false)
    private int minplayers;


    @Column(nullable = false)
    private int maxplayers;


    @Column(nullable = false)
    private int minplaytime;


    @Column(nullable = false)
    private int maxplaytime;

    @Column(nullable = false)
    private int minage;

    @Column(nullable = false)
    private int usersrated;

    @Column(nullable = false)
    private double average;

    @Column(nullable = false)
    private int boardgamerank;

    @Column(nullable = false)
    private int numweights;

    @Column(nullable = false)
    private double averageweight;

    @Column(nullable = false)
    private String strategygamerank;

    @Column(nullable = false)
    private String familygamerank;

    @Column(nullable = false)
    private String partygamerank;

    @Column(nullable = false)
    private String abstractgamerank;

    @Column(nullable = false)
    private String thematicrank;

    @Column(nullable = false)
    private String wargamerank;

    @Column(nullable = false)
    private String customizablerank;

    @Column(nullable = false)
    private String childrengamerank;

}
