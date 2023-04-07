package com.ssafy.billboard.model.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="baseaddress")
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
public class BaseAddress {
    @Id
    @Column(nullable = false, length = 10)
    private String dongCode;

    @Column(nullable = false, length = 30)
    private String sidoName;

    @Column(nullable = false, length = 30)
    private String gugunName;

    @Column(nullable = false, length = 30)
    private String dongName;

    @Column(nullable = false, length = 20)
    private String lat;

    @Column(nullable = false, length = 20)
    private String lng;
}
