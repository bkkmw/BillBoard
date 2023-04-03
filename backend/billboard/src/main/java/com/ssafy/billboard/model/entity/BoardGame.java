package com.ssafy.billboard.model.entity;

import lombok.*;
import org.springframework.data.domain.Persistable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="boardgameInfo")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class BoardGame implements Persistable<Integer> {

    @Id
    @Column(nullable = false)
    private int gameId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, length = 300)
    private String thumbnail;

    @Column(nullable = false, length = 300)
    private String image;

    @Column(length = 300)
    private String video;

    @Column(nullable = false, length = 6000)
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

    @Column(length = 10)
    private String strategygamerank;

    @Column(length = 10)
    private String familygamerank;

    @Column(length = 10)
    private String partygamerank;

    @Column(length = 10)
    private String abstractgamerank;

    @Column(length = 10)
    private String thematicrank;

    @Column(length = 10)
    private String wargamerank;

    @Column(length = 10)
    private String customizablerank;

    @Column(length = 10)
    private String childrengamerank;

    @Override
    public Integer getId() {
        return this.gameId;
    }

    @Override
    public boolean isNew() {
        return true;
    }

    public void updateVideo(String video){
        this.video = video;
    }
}
