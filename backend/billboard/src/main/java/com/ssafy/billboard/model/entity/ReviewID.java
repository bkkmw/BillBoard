package com.ssafy.billboard.model.entity;

import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewID implements Serializable {
    private int gameId;
    private String userId;
}
