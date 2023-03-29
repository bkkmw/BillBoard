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
    @Column(nullable = false)
    private int gameId;

    @Column(nullable = false)
    private String name;

    @Column()
    private String thumbnail;

    @Column()
    private String image;

    @Column()
    private String description;

    @Column()
    private int yearpublished;


    @Column()
    private int minplayers;


    @Column()
    private int maxplayers;


    @Column()
    private int minplaytime;


    @Column()
    private int maxplaytime;

    @Column()
    private int minage;

    @Column()
    private int usersrated;

    @Column()
    private double average;

    @Column()
    private int boardgamerank;

    @Column()
    private int numweights;

    @Column()
    private double averageweight;

    @Column()
    private String strategygamerank;

    @Column()
    private String familygamerank;

    @Column()
    private String partygamerank;

    @Column()
    private String abstractgamerank;

    @Column()
    private String thematicrank;

    @Column()
    private String wargamerank;

    @Column()
    private String customizablerank;

    @Column()
    private String childrengamerank;

}
