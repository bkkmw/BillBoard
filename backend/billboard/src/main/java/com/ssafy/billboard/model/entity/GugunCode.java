package com.ssafy.billboard.model.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="guguncode")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class GugunCode {
    @Id
    @Column(nullable = false, length = 10)
    private String gugunCode;

    @Column(nullable = false, length = 30)
    private String gugunName;
}
