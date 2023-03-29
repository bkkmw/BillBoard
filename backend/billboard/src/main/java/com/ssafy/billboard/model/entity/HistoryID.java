package com.ssafy.billboard.model.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoryID implements Serializable {
    private String userId;
    private int boardGame;
}
