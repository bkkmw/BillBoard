package com.ssafy.billboard.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.util.Date;

public class BoardGameDto {
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class BoardGame {
        private long gameId;
        private String primary;
        private String thumbnail;
        private String image;
        private String description;
        private int yearpublished;
        private int minplayers;
        private int maxplayers;
        private int minplaytime;
        private int maxplaytime;
        private int minage;
        private int usersrated;
        private double average;
        private int boardgamerank;
        private int numweights;
        private double averageweight;
        private String strategygamerank;
        private String familygamerank;
        private String partygamerank;
        private String abstractgamerank;
        private String thematicrank;
        private String wargamerank;
        private String customizablerank;
        private String childrengamerank;


    }
}
